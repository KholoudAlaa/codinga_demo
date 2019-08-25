var labelColor = document.querySelectorAll(".ant-form-item-children input");
labelColor.forEach(element => {
    element.onfocus = function() { 
        var parent =  element.closest('.ant-form-item');
        parent.querySelector('.ant-form-item-label label').style.color="#2DBB54";
        };

        element.onblur = function() { 
        var parent =  element.closest('.ant-form-item');
        parent.querySelector('.ant-form-item-label label').style.color="#5a5a5a";
        };
});