## 스마트싱스
1. 스마트싱스 플랫폼에 연결
    * 연결 방식
        * 허브 연결
            * zwave,zigbee 장치를 통해 연결
        * 클라우드 연결
            * 클라우드 서버(AWS 등)에서 직접 코드 실행
        * 직접 연결 **(박싱 제작 방식)**
            * 클라우드 서버 없이 직접 Smart Things 클라우드에 연결. SDK API 사용

2. 스마트싱스 연결된 서비스 사용
    * SmartApps 개발


## 제작 방법

* Reference
    * https://github.com/toddaustin07/rpi-st-device.git
    * https://github.com/SmartThingsCommunity/st-device-sdk-k.git

* Install packages
    ```
    sudo apt-get install gcc make git wget pythono3-serial python3-cryptography
    sudo apt-get install cmake gperf ninja-build ccache libncurses-dev flex bison libffi-dev libssl-dev python3-future python3-pyparsing python3-pyelftools
    sudo apt-get install libpthread-stubs0-dev
    pip3 install --user pynacl
    sudo apt-get install python3-pil
    pip3 install --user qrcode
    pip3 install --user pillow
    sudo apt-get install libopenjp2-7
    ```

* Build device library for smartThings
    ```
    cd ~/rpi-st-device
    ./sdkbuildsetup
    cd ~/st-device-sdk-c
    make
    ```

* Register Device in Developer Workspace
    1. Make device workspace
    2. Make device Profile and Onboarding
    3. Write Product info
    4. Create raspberry pi device key 
    5. Enroll your device key into your SmartThings in workspace
    6. download Onboarding.json and copy into raspberryPi directory
    7. make qrcode for device

* Build your device
    ```
    cd ~/st-device-sdk-c/example
    rm example
    make
    ```

* Setting Raspberry Pi for AP mode
    * Check your Pi have AP mode
        ```
        iw phy0 info
        ```
    * Check if you have with Wifi(2.4GHz) in your Area
        * If there no Wifi(2.4GHz) you can't connect your device in your phone

    * Install packages for SoftAP services
        ```
        sudo apt-get install hostapd
        sudo apt-get install dnsmasq
        ```
    
    * Disable SoftAP service to prevent start without your purpose
        ```
        sudo systemctl unmask hostapd
        sudo update-rc.d hostapd disable
        sudo update-rc.d dnsmasq disable
        ```

    * Copy and change dhcpcd_ap code
        ```
        sudo cp /etc/dhcpcd.conf /etc/dhcpcd_ap.conf
        sudo nano dhcpcd_ap.conf
        ```

        **setting**
        interface **wlan0**
            static ip_address = **192.168.2.1/24**
            **nohook wpa_supplicant**

    * Change hostapd.conf
        ```
        sudo nano /etc/hostapd/hostapd.conf
        ```
        **setting**
        contry_code=**KR**
        interface=**wlan0**
        channel=**(check your channel with 'iw wlan0 info')**

    * Change code dnsmasq.conf
        ```
        sudo nano /etc/dnsmasq.conf
        ```
        **setting**
        interface=**wlan0**
        dhcp-range=**192.168.2.2,192.168.2.10,255.255.255.0.12h**
        domain=wlan
        address=/gw.wlan/**192.168.2.1**

    * Enable AP mode
        ```
        cd ~/rpi-st-device
        sudo ./testhostapd
        ```

* Connect your device in your phone application
    1. Use qrcode
    2. Find devices that can be registered nearby