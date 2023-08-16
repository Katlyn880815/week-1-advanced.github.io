from flask import Flask, render_template, redirect, request, session, url_for
import mysql.connector
import mysql.connector.pooling
import json

#connection pool
db_config = {
    'user': 'root',
    'host': 'localhost',
    'password': '1234',
    'database': 'website'
}
connection_pool = mysql.connector.pooling.MySQLConnectionPool(pool_name= 'my_pool', pool_size = 10, **db_config)

#FUNCTION FOR SEARCH DATA
def load_data_new(sql, params = ''):
    conn = connection_pool.get_connection()
    print(params)
    if(params == ''):
        try:
            cursor = conn.cursor(dictionary = True)
            cursor.execute(sql)
            result = cursor.fetchall()
        finally:
            conn.close()
    else:
        try:
            cursor = conn.cursor(dictionary = True)
            cursor.execute(sql, (params))
            result = cursor.fetchone()
        finally:
            conn.close()
    return result

#Function for insert data
def crud_data(sql, param):
    con = connection_pool.get_connection()
    cursor = con.cursor()
    cursor.execute(sql, (param))
    con.commit()
    con.close()

app = Flask(__name__, static_folder= 'static', static_url_path='/static', )
app.secret_key = '1234'




######## ROUTE / ############
@app.route('/')
def homepage():
    return render_template('homepage.html')

######## ROUTE /member #######
@app.route('/member')
def member_page():
    try:
        name = session['name']
        username = session['username']
        password = session['password']
    except:
        username = None
        return redirect('/')
    comments = load_data_new('SELECT member.name, message.content, message.id FROM member INNER JOIN message ON member.id = message.member_id')
    return render_template('member_page.html', name = name, comments = comments)

######## ROUTE /error ############
@app.route('/error')
def handle_error():
    error_message = request.args.get('message', 'Unknown error')
    return render_template('error_page.html', message = error_message)


######## ROUTE /signup ############
@app.route('/signup', methods = ['POST'])
def handle_signup():
    #接收使用者輸入資料
    name = request.form.get('signup__name')
    username = request.form.get('signup__username')
    password = request.form.get('signup__password')

    #判斷資料是否已存在資料庫中
    result = load_data_new("select * from member where username = %s", (username, ))
    if(result == None):
        try:
            crud_data("INSERT INTO member(name, username, password) VALUES(%s, %s, %s)", (name, username, password,))
        except:
            print('error')
        return redirect('/')
    else:
        return redirect('/error?message=帳號已經被註冊')
    

######## ROUTE /signin ############
@app.route('/signin', methods = ['POST'])
def handle_signin():
    #接收使用者輸入資料
    username = request.form.get('login__username')
    password = request.form.get('login__password')
    result = load_data_new("select * from member where username = %s and password = %s", (username, password,))
    #加入session
    if(result):
        for row in result:
            session['id'] = result['id']
            session['name'] = result['name']
            session['username'] = result['username']
            session['password'] = result['password']
        return redirect('/member')
    else:
        return redirect('/error?message=帳號或密碼輸入錯誤')


######## ROUTE /signout ############
@app.route('/signout')
def handle_signout():
    session.clear()
    return redirect('/')


######## ROUTE /createMessage ############
@app.route('/createMessage', methods=['POST'])
def handle_comments():
    user_id = session['id']
    content = request.form.get('user__new_message')
    crud_data("INSERT INTO message(member_id, content) VALUES(%s, %s)",(user_id, content))
    return redirect('/member')


######## ROUTE /deleteMessage ############
@app.route('/deleteMessage', methods=['POST'])
def handle_deleteMsg():
    msg_id = request.form.get('id')
    crud_data('DELETE FROM message where id = %s', (msg_id,))
    return redirect('/member')

######## ROUTE /api/member ################
@app.route('/api/member', methods = ['GET', 'PATCH'])
def search_user():
    try:
        username = session['username']
        session['password']
    except:
        return redirect('/')
            
    if(request.method == 'GET'):
        user_input_username = request.args.get('username')
        data = load_data_new('Select id, name, username from member where username = %s', (user_input_username,))
        if(data == None):
            data = {
                "data": None
            }
        data = json.dumps(data)
        return data
    elif(request.method == 'PATCH'):
        try: 
            user_new_name = request.get_json()
            user_new_name = user_new_name['name']
            if(user_new_name != session['name']):
                crud_data('update member set name = %s where username = %s', (user_new_name, username,))
                data = {
                    'ok': True
                }
                session['name'] = user_new_name
            else:
                data = {
                'error': True,
                'cause': 'Name Not Modified'
            }
        except:
            data = {
                'error': True,
                'cause': 'Server error'
            }
        finally:
            return json.dumps(data)

app.run(port=3000)

