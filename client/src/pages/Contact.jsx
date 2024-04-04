// import Navbar from "../components/User/Navbar";
// import React, { useState } from "react";
// import axios from "axios";
// import { contactFormRoute } from "../utils/APIRoutes";
// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Form data in contact", formData);
//       await axios.post(contactFormRoute, formData);
//       alert("Form data saved successfully");
//       // Optionally, clear form fields after submission
//       setFormData({ name: "", email: "", message: "" });
//     } catch (error) {
//       console.error("Error saving form data:", error);
//       alert("Error saving form data. Please try again later.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div style={styles.container}>
//         <h1>Contact Us</h1>
//         <p style={styles.text}>Feel free to reach out to us!</p>
//         <form style={styles.form} onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name" style={styles.label}>
//               Name:
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="email" style={styles.label}>
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="message" style={styles.label}>
//               Message:
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               rows="4"
//               cols="50"
//               style={styles.textarea}
//               value={formData.message}
//               onChange={handleChange}
//             ></textarea>
//           </div>
//           <button type="submit" style={styles.button}>
//             Submit
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// // Inline styles
// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "20px",
//   },
//   text: {
//     fontSize: "18px",
//     marginBottom: "20px",
//   },
//   form: {
//     maxWidth: "500px",
//     margin: "0 auto",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//   },
//   label: {
//     display: "block",
//     marginBottom: "5px",
//   },
//   input: {
//     width: "100%",
//     padding: "8px",
//     marginBottom: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "3px",
//   },
//   textarea: {
//     width: "100%",
//     padding: "8px",
//     marginBottom: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "3px",
//     resize: "vertical",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     color: "white",
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "3px",
//     cursor: "pointer",
//   },
// };

// export default Contact;

import React, { useState } from "react";
import axios from "axios";
import { contactFormRoute } from "../utils/APIRoutes";
import Navbar from "../components/User/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error message when the user starts typing in a field
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Form data in contact", formData);
        await axios.post(contactFormRoute, formData);
        alert("Form data saved successfully");
        // Optionally, clear form fields after submission
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        console.error("Error saving form data:", error);
        alert("Error saving form data. Please try again later.");
      }
    } else {
      // Display validation errors
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    // Validate name
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }
    // Validate email
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email format";
    }
    // Validate message
    if (!data.message.trim()) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1>Contact Us</h1>
        <p style={styles.text}>Feel free to reach out to us!</p>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" style={styles.label}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="email" style={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
          </div>
          <div>
            <label htmlFor="message" style={styles.label}>
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              cols="50"
              style={styles.textarea}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && (
              <span style={{ color: "red" }}>{errors.message}</span>
            )}
          </div>
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

// Inline styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  form: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "3px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    resize: "vertical",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
};

export default Contact;
