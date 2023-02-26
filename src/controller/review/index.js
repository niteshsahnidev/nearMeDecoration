const reviewCollection = require("../../db/model/review")
const nodemailer = require("nodemailer");
const userCollection = require("../../db/model/user")
const jwt = require("jsonwebtoken")
require("dotenv").config()


// let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     requireTLS:true,
//     auth: {
//         user: "mtest8969@gmail.com", // generated ethereal user
//         pass: "rzyhiwedtnpbjjpn", // generated ethereal password
//     },
// });

var transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: 'ask.event07@gmail.com',
      pass: 'nompwjsbzkjtdvme'
    }
  });


const getReviews = async (req, res) => {
    try {
        const id = req.params.id;
        const review = await reviewCollection.find({ decorationId: id });
        let data = review.map((item)=>({
            decorationId: item.decorationId,
            email: hideEmail(item.email),
            mobile:maskPhoneNumber(item.mobile),
            name: item.name,
            rating: item.rating,
            review: item.review
        }));

        res.status(200).json({
            status: 200,
            success: true,
            data: data
        })
    } catch (err) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "Something Went Wrong"
        })
    }
}

const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewCollection.find();

        let data = reviews.map((item)=>({
            decorationId: item.decorationId,
            email: hideEmail(item.email),
            mobile:maskPhoneNumber(item.mobile),
            name: item.name,
            rating: item.rating,
            review: item.review
        }));

        res.status(200).json({
            status: 200,
            success: true,
            data: data
        })
    } catch (err) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "Something Went Wrong"
        })
    }
}

const createReview = async (req, res) => {
    try {
        if (req.body) {
            const review = new reviewCollection(req.body);
            const saved = await review.save();
            console.log("Saved Review ====> ", saved);
            res.status(200).json({
                status: 200,
                success: true,
                message: "Review Saved Successfully"
            });

            let mailSentToReviewer = await transporter.sendMail({
                from: '"Sakshi Events"mtest8969@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Thank you, 🙏", // Subject line
                // text: "Thank you, 🙏 for your valuable feedback", // plain text body
                html: "<b>Thank you, 🙏 for your valuable feedback.</b> <p>We will try our best to improve our services.</p>", // html body
            });

            const user = await userCollection.find()
            
            const token = jwt.sign({id:user[0]._id},process.env.JWT_SECRET_KEY)
            let mailSentToAdmin = await transporter.sendMail({
                from: '"Sakshi Events, Review"mtest8969@gmail.com', // sender address
                to: "sahninitesh01@gmail.com,sakshievents22@gmail.com,sakshievents95@gmail.com", // list of receivers
                subject: "🔴 You got a review from a customer", // Subject line
                // text: "🔴 You got a review from a customer", // plain text body
                html: `<b>Namaste Admin 🙏,</b>
                <br/>
                <p> You got a review from a customer</p>
                <p>Name: ${req.body.name}</p>
                <p>Mobile: ${req.body.mobile}</p>
                <p>Email: ${req.body.email}</p>
                <p>Rating: ${req.body.rating}</p>
                <p>Review: ${req.body.review}</p>
                <br/>
                <a href="http://localhost:8081/delete-review?id=${saved._id}&authToken=${token}">Click here if you want to delete the review</a>
                `, // html body
            });

            console.log("Message Sent Successfully");

        } else {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Please fill all the fields."
            })
        }
    } catch (err) {
        console.log("Save Review Error ====> ", err)
        res.status(400).json({
            status: 400,
            success: false,
            message: "Something Went Wrong"
        })
    }
}


const deletedReview = async (req, res) => {
    try {
        const id = req.query.id;
        // idList.forEach(async (element) => {
        const deleted = await reviewCollection.findByIdAndDelete(id);
        // });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Review Deleted Successfully"
        })
    } catch (err) {
        console.log("Review Delete Error ====> ", err.message)
        res.status(400).json({
            status: 400,
            success: false,
            message: "Something Went Wrong"
        })
    }
}


let hideEmail = function(email) {
    return email.replace(/(.{2})(.*)(?=@)/,
      function(gp1, gp2, gp3) { 
        for(let i = 0; i < gp3.length; i++) { 
          gp2+= "*"; 
        } return gp2; 
      });
  };



  function maskPhoneNumber(phoneNumber) {

	var regularExpresion = /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/g, // regular expression to test phone numbers
		stringArray,
		maskString,
		lastString;
	
	// Check if given input matches the phone number pattern
	if(regularExpresion.test(phoneNumber)) {
		
		// split phone number to an array of characters to manipulate string
		stringArray = phoneNumber.split("");

		/* 
		 * splice the array after reversing so that last 4 digits are seperated
		 * Now stringArray will have last 4 digits and maskString will have remaining characters
		 *
		 */
		maskString = stringArray.reverse().splice(4);

		// reverse and join the array to get last 4 digits without any change
		lastString = stringArray.reverse().join("");

		// now replace the remaining characters where digits are present with "X" and then join the array
		// concat masked string with last 4 digits to get the required format
		phoneNumber = maskString.reverse().join("").replace(/\d/g,"X") + lastString;
	}

	return phoneNumber;
}


module.exports = { getAllReviews, getReviews, deletedReview, createReview }