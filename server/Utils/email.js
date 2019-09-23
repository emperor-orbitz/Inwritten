var sgMail = require('@sendgrid/mail');

module.exports = class email{

 constructor(fields){
  this.options =options;
  this.fields = fields,
  this.from = 'contact@penbox.com',
  this.EMAIL_TYPE =EMAIL_TYPE
  sgMail.setApiKey(process.env.SENDGRID_API_KEY); //SET API KEY

 }

  VERIFICATION_EMAIL(){

  var message = {
  to: this.fields.email,
  from: this.from,
  templateId: 'd-c0dbe040a46b4cc0b2131cb82c58d1ce',
  dynamic_template_data: {
    name: this.fields.username,
    confirm_link: `api/mailconfirm/${this.fields.confirm_link}`
  }
}

return sgMail.send(message);
}


 






}


