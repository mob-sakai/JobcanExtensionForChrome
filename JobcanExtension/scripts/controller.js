// コンテキストルート(?)からのパスとアクションを紐付け
var exec = ({
  "/employee/man-hour-manage": manHourManage,
  "/employee/attendance": attendance,
  "/employee/over-work/new": overWorkNew
})[location.pathname];

if (exec)
  exec();
