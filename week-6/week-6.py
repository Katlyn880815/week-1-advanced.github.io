from flask import Flask, render_template, redirect, request, session
import mysql.connector

#Function for load data
def load_data(sql, username, password, commend):
    con = mysql.connector.connect(
        user= 'root',
        host = 'localhost',
        password = '1234',
        database = 'website'
    )
    cursor = con.cursor()
    if(commend == 'for_checking_is_exist'):
        print(username)
        cursor.execute(sql, (username,))
        result = cursor.fetchone()
        print(result)
    elif(commend == 'for_search_data'):
        cursor.execute(sql)
        result = cursor.fetchall()
    else:
        cursor.execute(sql, (username, password,))
        result = cursor.fetchone()
    con.close()
    return result

#Function for insert data
def crud_data(sql, param):
    con = mysql.connector.connect(
        user= 'root',
        host = 'localhost',
        password = '1234',
        database = 'website'
    )
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
        #檢查使用者狀態，是否存取得到值
        name = session['name']
        username = session['username']
        password = session['password']
    except:
        username = None
        return redirect('/')
    #取得所有留言內容
    comments = load_data('SELECT member.name, message.content, message.id FROM member INNER JOIN message ON member.id = message.member_id', username, password, 'for_search_data')
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
    result = load_data("select * from member where username = %s", username, password, 'for_checking_is_exist')
    if(result == None):
        crud_data("INSERT INTO member(name, username, password) VALUES(%s, %s, %s)", (name, username, password,))
        return redirect('/')
    else:
        return redirect('/error?message=帳號已經被註冊')
    

######## ROUTE /signin ############
@app.route('/signin', methods = ['POST'])
def handle_signin():
    #接收使用者輸入資料
    username = request.form.get('login__username')
    password = request.form.get('login__password')
    result = load_data("select * from member where username = %s and password = %s", username, password, 'for_signin')
    #加入session
    if(result):
        session['id'] = result[0]
        session['name'] = result[1]
        session['username'] = result[2]
        session['password'] = result[3]
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

app.run(port=3000)
