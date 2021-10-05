console.show()

var check = confirm("请确认最近使用过we重邮!");
if (!check) {
  toast("请使用一次we重邮!");
} else {
  setScreenMetrics(433, 910);
  launchApp("微信");
  waitForPackage("com.tencent.mm", 100);
  swipe(300, 200, 300, 1000, 1000);
  sleep(2000);
  try {
    id("dix").findOne().children().forEach(child => {
      var target = child.findOne(id("ipm"));
      console.log(target.getText());
      if (target.getText() == "We重邮") {
        target.parent().click();
        throw new Error("结束");
      }
    });
  } catch (e) {
    if (e.message != "结束") console.log(e);
    else {
      sleep(2000);
      className("android.view.View").text("每日打卡").findOne().click();
      sleep(2000);
      scrollDown(0);
      scrollDown(0);// 确保滑到底部
      if(className("android.view.View").text("已打卡，明日再来\n").exists()){
        toast("已经打卡过了！");
      } else {
        sleep(200);
        press(225, 774, 1500);
        // 打卡点击
        click(225, 730);
        id("ffp").waitFor();
        id("ffp").findOne().click();
        back();
        back();
        back();
      }
    }
  }
}