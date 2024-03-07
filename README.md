# WeTube Reloaded

프로젝트의 도메인 : 비디오 or 유저
라우터는 특정 분기를 만들고 Url을 추가해 나가도록 해준다.

글로벌 라우터
/ -> Home
/join -> Join
/login -> Login
/search -> Search

유저 라우터
/users/:id -> see user
/user/logout
/users/edit -> Edit My Profile
/users/delete -> Delete user

비디오 라우터
/videos/:id -> Watch Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video
