var sendEmail = function (args) { 

    var emailDialog = Ti.UI.createEmailDialog();

    if (!emailDialog.isSupported()) {
        Ti.UI.createAlertDialog({
            title:'Cannot send Email',
            message:'Email not available on your device'
        }).show();
        return;
    }
    
    if (args.to) {
        emailDialog.toRecipients = args.to;
    }
    
    emailDialog.setSubject(args.subject);
    emailDialog.setHtml(true);
    emailDialog.setMessageBody(args.html);

    emailDialog.open();
};

exports.sendEmail = sendEmail;
