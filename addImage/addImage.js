const app = getApp();
app.globalData.imageList = [];
// components/addImage/addImage.js
Component({
  properties: {
  },
  data: {
    imageList: []
  },
  methods: {
    addImage(){
      wx.chooseImage({
        count: 8,
        success: (res)=>{
          const oldImageList = app.globalData.imageList;
          if (oldImageList.concat(res.tempFilePaths).length > 8) {
            wx.showToast({
              title: '最多上传8张图片',
              icon: 'none',
              duration: '2500'
            })
          }else{
            app.globalData.imageList = oldImageList.concat(res.tempFilePaths);
            // console.log('imageList', app.globalData.imageList);
            this.setData({
              imageList: app.globalData.imageList
            })
          }
        }
      })
    },
    removeImage(e){
      const imageList = app.globalData.imageList;
      const index = e.currentTarget.dataset.index;
      imageList.splice(index,1)
      this.setData({
        imageList
      })
    }
  }
})
