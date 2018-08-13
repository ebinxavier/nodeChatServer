
let User = require('../../model/User')

function addContact(userPhone, contactPhone, cb) {
  User.findOne({ phone: userPhone }, function (err, user) {

    // On failure

    if (err) cb({ type: "error", reason: "Network/DB", details: err });
    else if (!user)
      cb({ type: "error", reason: "No record found", details: err });

    // On successful response 

    else {
      User.findOne({ phone: contactPhone }, function (err, contact) {

        // On failure

        if (err) cb({ type: "error", reason: "Network/DB", details: err });
        else if (!contact)
          cb({ type: "error", reason: "No record found", details: err });

        // On successful response 

        else {

          // Checking duplicate contact
          if (user.contacts.indexOf(contact.id) == -1) {
            user.contacts.push(contact.id);

            // save the edited user
            user.save(function (err) {
              if (err) throw err;
              cb({ type: "success", msg: "Added new Contact: " + contact.details.name, details: contact });
            });
          }
          else
            cb({ type: "error", reason: "Contact already exist", details: null });
        }


      });
    }


  });
}

module.exports = addContact