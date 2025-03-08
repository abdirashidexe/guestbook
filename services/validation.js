export default function validateForm(data) {
    
    // Store all the validation errors in an array
    const errors = [ ];

    // Validate first name
    if (!data.fname || data.fname.trim() === "")
    {
        errors.push('Please enter a first name.');
    }

    // Validate last name
    if (!data.lname || data.lname.trim() === "")
        {
            errors.push('Please enter a last name.');
        }

    // Validate job
    if (!data.job || data.job.trim() === "")
        {
            errors.push('Please enter a job.');
        }
    
    // Validate company
    if (!data.company || data.company.trim() === "") {
        errors.push('Please enter a company.');
    }

    // Validate linkedin
    if (!data.linkedin || data.linkedin.trim() === "" || 
        (data.linkedin.indexOf("linkedin.com/in/") === -1)) 
    {
        errors.push('Please enter a valid LinkedIn URL.');
    }

    // Validate email
    if (!data.email || data.email.trim() === "" ||
        data.email.indexOf("@") === -1 || 
        data.email.indexOf(".") === -1)
    {
        errors.push('Please enter a valid email.');
    }

    // Validate met (will never hit because no "Select an option" option)
    const validOptions = ["classroom", "job_fair", "meetup"];

    if (!data.met || !validOptions.includes(data.met.toLowerCase())) {
        errors.push('Please select how we met.');
    }

    // "Other" doesn't need validation.
    // "Message" doesn't need validation.
    // "Mailing List" doesn't need validation.

    // Validate email format (html or text)
    if (!data.emailformat) {
        errors.push('Please select an email format.');
    } else {
        const validOptions = ["html", "text"];
        if (!validOptions.includes(data.emailformat.toLowerCase()))
        {
            errors.push("Go away!");
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}