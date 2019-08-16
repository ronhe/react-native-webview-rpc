export default `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React-Native WebView RPC Example</title>
    <script>
        // ** hack - wait until script is loaded from CDN **
        function initProxy() {
          if (typeof window.rnRpc !== 'undefined') {
            console.log('rnRpc loaded');
            window.proxy = window.rnRpc.proxy(); // init a proxy object
            window.rnRpc.expose( { document } ); // expose the document object
          } else {
            setTimeout(initProxy, 500);
          }
        }
        initProxy();
        // **********************************************

        async function fireNativeAlert() {
          await proxy.Alert.alert(
            'What is your favorite color?',
            'We got green and blue',
            [
              {text: 'Ask me later'},
              {text: 'Green', onPress: window.rnRpc.proxyValue(() => setBgColor('green'))},
              {text: 'Blue', onPress: window.rnRpc.proxyValue(() => setBgColor('blue'))},
            ],
            { cancelable: false }
          );
        }

        function setBgColor(color) {
          document.body.style.backgroundColor = color;
        }

        async function getNetInfo() {
          let netInfo = await await proxy.NetInfo.getConnectionInfo();
          document.getElementById('net-type').value = netInfo.type;
          document.getElementById('net-eff-type').value = netInfo.effectiveType;
        }
    </script>
    <style>
        html, body, .container {
            height: 100%;
        }
        .container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size: 5vw;
            margin: 1vw;
        }
        .button {
            font-size: 5vw;
            margin: 1vw;
            width: 100%;
        }
        .row-container {
            display: flex;
            flex-direction: row;
            width: 100%;
        }
        .row-element {
            width: 50%;
        }
    </style>
</head>
<body>
    <div class="container">
        <button onclick="fireNativeAlert()" class="button">
            Fire Native Alert
        </button>
        <div class="line-break"></div>
        <button onclick="getNetInfo()" class="button">
            Get Net Info
        </button>
        <div class="row-container">
            <div class="row-element">
                Net type:
            </div>
            <input id="net-type" disabled class="button row-element"/>
        </div>
        <div class="row-container">
            <div class="row-element">
                Net effective type:
            </div>
            <input id="net-eff-type" disabled class="button row-element"/>
        </div>
    </div>
</body>
</html>`;
