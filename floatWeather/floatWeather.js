// components/floatWeather/floatWeather.js
const weatherKey = 'SCvQ24WiOY6_RwVLS';
const weatherUrl = 'https://api.seniverse.com/v3/weather/now.json';

Component({
  properties: {
    location: String,
    advice: Boolean,
    adviceTip: String,
    welcome: Boolean,
    welcomeSentence: String,
    welcomeLocation: String
  },
  data: {
  },
  lifetimes: {
    attached(){
      this.checkLocation();
    }
  },
  methods: {
    checkLocation(){
      if (this.data.location) {
        // console.log('data', {
          // location: this.data.location,
          // advice: this.data.advice,
          // adviceTip: this.data.adviceTip,
          // welcome: this.data.welcome,
          // welcomeSentence: this.data.welcomeSentence,
          // welcomeLocation: this.data.welcomeLocation
        // });
        this.getWeatherInfo();
      }else{
        setTimeout( () => {
          this.checkLocation();
        }, 1000)
      }
    },
    getWeatherInfo(){
      // 初始化天气信息
      // console.log('in get info');
      wx.request({
        url: `${weatherUrl}?key=${weatherKey}&location=${this.data.location}&language=zh-Hans&unit=c`,
        success: (res) => {
          this.setCurrentWeather(res.data.results[0].now);
        }
      })
    },
    setCurrentWeather(weather){
      // 根据天气设置内容
      // console.log('in set info');
      const currentWeather = {};
      if (weather.code == 0 || weather.code == 2 ) {
        currentWeather.tip = '适合外出活动, 请注意防晒'
        currentWeather.icon = 'qintian.png'
      }else if(weather.code == 1 || weather.code == 3){
        currentWeather.tip = '早睡早起身体好'
        currentWeather.icon = 'qinwan.png'
      }else if(weather.code >=4 && weather.code <=8){
        currentWeather.tip = '注意天气变化'
        currentWeather.icon = 'yun.png'
      }else if (weather.code ==9) {
        currentWeather.tip = '注意天气变化'
        currentWeather.icon = 'yin.png'
      }else if(weather.code >=10 && weather.code <= 18){
        currentWeather.tip = '注意带伞'
        currentWeather.icon = 'yu.png'
      }else if (weather.code >19 && weather.code <= 25 || weather.code == 37){
        currentWeather.tip = '注意保暖'
        currentWeather.icon = 'xue.png'
      }else if(weather.code >= 26 && weather.code <= 29){
        currentWeather.tip = '注意防护'
        currentWeather.icon = 'sha.png'
      }else if (weather.code == 38) {
        currentWeather.tip = '注意防晒'
        currentWeather.icon = 'qintian.png'
      }else {
        currentWeather.tip = '注意天气变化'
        currentWeather.icon = 'qintian.png'
      }
      currentWeather.icon = "./icons/weather/" + currentWeather.icon;
      this.setData({
        temperature:  weather.temperature,
        weatherStatus: weather.text,
        currentWeather
      })
    },
    closeWeather(){
      // 关闭天气弹窗
      this.triggerEvent('closeWeather');
    }
  }
})
