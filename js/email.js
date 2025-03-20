(function () {
	// Initialize EmailJS with your service ID
	emailjs.init("xESxfIi5Tybb_d4Am");

	// Log to verify initialization
	console.log("EmailJS initialized");

	document.addEventListener("DOMContentLoaded", function () {
		// Get the contact form element
		const contactForm = document.getElementById("contact-form");
		console.log("Contact form found:", !!contactForm);

		if (contactForm) {
			contactForm.addEventListener("submit", function (event) {
				event.preventDefault();
				console.log("Form submitted");

				// Display loading state
				const submitBtn = contactForm.querySelector('input[type="submit"]');
				const originalBtnValue = submitBtn.value;
				submitBtn.value = "Sending...";
				submitBtn.disabled = true;

				// Prepare template parameters from form data
				const templateParams = {
					from_name: document.getElementById("c_fname").value + " " + document.getElementById("c_lname").value,
					email: document.getElementById("c_email").value,
					subject: document.getElementById("c_subject").value,
					message: document.getElementById("c_message").value,
				};

				console.log("Sending email with params:", templateParams);

				// Send email using EmailJS
				emailjs
					.send("service_ourouj9", "template_9khzytm", templateParams)
					.then(function (response) {
						console.log("SUCCESS!", response.status, response.text);
						submitBtn.value = "Message Sent!";

						// Reset form
						contactForm.reset();

						// Reset button after 3 seconds
						setTimeout(function () {
							submitBtn.value = originalBtnValue;
							submitBtn.disabled = false;
						}, 3000);

						// Show success message
						showMessage("Your message has been sent successfully!", "success");
					})
					.catch(function (error) {
						console.error("FAILED...", error);
						submitBtn.value = originalBtnValue;
						submitBtn.disabled = false;

						// Show error message with more details
						let errorMsg = "Failed to send message. ";
						if (error && error.text) {
							errorMsg += error.text;
						} else {
							errorMsg += "Please check your EmailJS configuration and try again.";
						}
						showMessage(errorMsg, "error");
					});
			});
		} else {
			console.error("Contact form not found!");
		}
	});

	// Function to show success/error messages
	function showMessage(message, type) {
		const messageDiv = document.createElement("div");
		messageDiv.className = "alert alert-" + (type === "success" ? "success" : "danger");
		messageDiv.textContent = message;

		const formContainer = document.querySelector(".p-3.p-lg-5.border");
		if (formContainer) {
			formContainer.insertBefore(messageDiv, formContainer.firstChild);

			// Remove message after 5 seconds
			setTimeout(function () {
				messageDiv.remove();
			}, 5000);
		} else {
			console.error("Form container not found for showing message");
		}
	}
})();
