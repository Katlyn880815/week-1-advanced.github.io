from flask import Flask, render_template, redirect, request, session

#建立app物件
#css\javaScript為靜態物件，要在此設定靜態檔案路徑，static_url_path為找到靜態檔案的路徑 -> 根目錄/+資料夾名稱
app = Flask(__name__, static_folder= 'static', static_url_path='/static', )

app.secret_key = '1234'

######## HOMEPAGE ############
#建立路徑 / 對應處理函式
@app.route('/')
def home_page():
    return render_template('home_page.html')

######## Signin Page #########
#建立路徑 /signin 對應處理函式，methods = POST
@app.route('/signin', methods=["POST"])
def signin():
    #取得user_account & user_password
    user_account = request.form.get('user_account', ' ')
    user_password = request.form.get('user_password', ' ')
    signed_in = False
    if(user_account == 'test' and user_password == 'test'):
        #如果驗證成功，重新導向至sucessful page
        #session's data "signed_in" set to Ture
        signed_in = True
        session['signed_in'] = signed_in
        return redirect('/member')
    else:
        if(user_account == '' or user_password == ''):
            return redirect('/error?message=尚未輸入帳號或密碼')
        #如果失敗，重新導向至error page
        else:
            return redirect('/error?message=帳號、或密碼輸入錯誤')

######## Member Page #########
#驗證成功路徑 /member 對應處理函式
@app.route('/member')
def member_page():
    if(session['signed_in'] == False):
        return redirect('/')
    else:
        return render_template('success_page.html')

######## Error Page #########
#驗證失敗路徑 /error 對應處理函式
@app.route('/error')
def handle_error():
    error_message = request.args.get('message', 'Unknown error')
    return render_template('Error_page.html', message = error_message)

######## Signout Page #########
#建立路徑 /signout 對應處理函式
@app.route('/signout')
def handle_signout():
    session['signed_in'] = False
    return redirect('/')

######## Square Page #########
@app.route('/square')
def calc_square():
    #取使用者輸入的數字
    num = request.args.get('user_input_num')
    num = int(num)
    result = num ** 2
    return render_template('square_page.html', result = result)

app.run(port=3000)