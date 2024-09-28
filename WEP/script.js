Kakao.init('YOUR_APP_KEY');

function kakaoLogin() {
    Kakao.Auth.login({
        success: function(authObj) {
            console.log(authObj);
            getUserInfo();
        },
        fail: function(err) {
            console.error(err);
        }
    });
}

function getUserInfo() {
    Kakao.API.request({
        url: '/v2/user/me',
        success: function(response) {
            console.log(response);
            document.getElementById('user-info').style.display = 'block';
            document.getElementById('user-name').innerText = `Name: ${response.properties.nickname}`;
            document.getElementById('user-email').innerText = `Email: ${response.kakao_account.email}`;
        },
        fail: function(error) {
            console.error(error);
        }
    });
}
