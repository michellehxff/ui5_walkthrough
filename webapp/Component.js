sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
   "./controller/HelloDialog",
   "sap/ui/Device"
], function (UIComponent, JSONModel, ResourceModel, HelloDialog, Device)  {
   "use strict";
   return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
      metadata : {
         manifest: "json"
      },
      init: function () {
         // call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);
         // set data model
         var oData = {
            recipient : {
               name : "UI5"
            }
         };
         var oModel = new JSONModel(oData);
         this.setModel(oModel);

         // set device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
        
         // disable batch grouping for v2 API of the northwind service
        this.getModel("invoice").setUseBatch(false);
            
         // set dialog
         this._HelloDialog = new HelloDialog(this.getRootControl());
         // wir haben es in die Initfunktion gesetzt

        // create the views based on the url/hash
        this.getRouter().initialize();
      },

      getContentDensityClass : function() {
        if(!this._sContentDensityClass) {
            if(!Device.support.touch) {
                this._sContentDensityClass = "sapUiSizeCompact";
            } else {
                this._sContentDensityClass = "sapUiSizeCozy";
            }
        }
        return this._sContentDensityClass;
        },
      
      //brauchen eine Exit Event
      exit: function(){
          //Mit privater Methode
          this._HelloDialog.destroy();
          delete this._HelloDialog;
      },
      openHelloDialog : function(){
          this._HelloDialog.open();
      }
   });
});