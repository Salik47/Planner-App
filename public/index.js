const URI = "http://localhost:1338/api/v1/schedule/";
const PUBLIC_VAPID_KEY =
  "BAZkLjpUJIrParwPRz90X0zpISPHEN0lyH2xSWK3Ka4Re3Fda4XAlznPTOoyd8DwVvDGY-5KH2X5adM2ejpFpeo";
const form = document.getElementById("myForm");

form.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();
    var inputArray = document.getElementById("inputArray").value;
    var scheduleArray = JSON.parse(inputArray);

    const register = await navigator.serviceWorker.register("./worker.js", {
      scope: "/",
    });

    // Check if push notifications are supported and the user has granted permission
    if (!("PushManager" in window)) {
      alert("Push notifications are not supported by your browser.");
      return;
    }
    if (Notification.permission === "denied") {
      alert("You have denied permission for push notifications.");
      return;
    }

    // Subscribe the user to push notifications
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: PUBLIC_VAPID_KEY,
    });

    const response = await fetch(URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schedule: scheduleArray,
        subscription: subscription,
      }),
    });
    const data = await response.json();
    console.log(data);
    alert("You have successfully subscribed to push notifications.");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});
/*
async function registerServiceWorker() {
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: PUBLIC_VAPID_KEY,
  });

  form.addEventListener("submit", async function (event) {
    try {
      event.preventDefault();
      var inputArray = document.getElementById("inputArray").value;
      var scheduleArray = JSON.parse(inputArray);
      console.log(inputArray);

      console.log(JSON.stringify({ schedule: array }));
      const response = await fetch(URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schedule: scheduleArray,
          subscription: subscription,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });
}
*/
