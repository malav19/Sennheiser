import Navbar from "../components/User/Navbar";
export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div style={styles.aboutUsContainer}>
        <h2 style={styles.heading}>About Us</h2>
        <p style={styles.paragraph}>
          Welcome VIBE CHECK, your premier destination for top-quality audio
          equipment, microphones, and podcasting essentials. Established in
          2020, we embarked on a journey fueled by our passion for audio
          innovation and our commitment to delivering exceptional products and
          services to our customers. At VIBE CHECK, we recognize the pivotal
          role that audio plays in enhancing creativity, communication, and
          entertainment. Whether you're a seasoned professional or an aspiring
          podcaster, we're dedicated to providing you with the tools you need to
          amplify your voice and make an impact. Our journey began with a vision
          to bridge the gap between audio enthusiasts and high-performance
          equipment. From studio-grade microphones to cutting-edge podcasting
          gear, we've curated a carefully selected collection of products from
          leading brands, ensuring that every item meets our rigorous standards
          of quality and reliability. What sets us apart is our deep
          understanding of the audio industry and our unwavering commitment to
          customer satisfaction. Our team of audio experts is passionate about
          helping you find the perfect solution for your unique needs, whether
          you're setting up a home studio, recording a podcast, or performing on
          stage. We believe in the power of sound to inspire, connect, and
          transform lives. That's why we're dedicated to providing you with more
          than just products—we're here to offer guidance, support, and
          inspiration every step of the way. Thank you for choosing VIBE CHECK
          as your trusted partner in the world of audio. Whether you're a
          professional musician, a content creator, or simply a lover of great
          sound, we're here to help you unleash your creativity and achieve your
          goals. Let's make some noise together! VIBE CHECK!
        </p>
        {/* Add your "About Us" message here */}
      </div>
    </>
  );
}
/* styles.css */

const styles = {
  aboutUsContainer: {
    width: "80%",
    margin: "0 auto",
    padding: "40px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
    marginBottom: "30px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    color: "#333",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#666",
  },
};
