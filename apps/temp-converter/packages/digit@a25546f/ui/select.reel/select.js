var AbstractSelect=require("montage/ui/base/abstract-select").AbstractSelect;exports.Select=AbstractSelect.specialize({constructor:{value:function(){this.super(),this.classList.add("digit-Select"),this.addPathChangeListener("content",this,"handleContentChange")}},enterDocument:{value:function(e){this.super(e),this.element.addEventListener("change",this,!1)}},handleChange:{value:function(){var e=this.contentController.organizedContent,t=this.element.selectedIndex;this.value=e[t]}},handleContentChange:{value:function(){null==this.value&&(this.value=this.contentController.organizedContent[0])}},draw:{value:function(){var e,t=this.contentController.organizedContent;this._contentIsDirty&&(this.drawOptions(),this._contentIsDirty=!1),e=t.indexOf(this.value),-1==e&&(e=0),this.element.selectedIndex=e}},drawOptions:{value:function(){for(var e,t,n=this.contentController.organizedContent,i=document.createDocumentFragment(),o=0,a=n.length;a>o;o++)e=document.createElement("option"),t=n[o],e.textContent=t[this.labelPropertyName],i.appendChild(e);this.element.innerHTML="",this.element.appendChild(i)}}});