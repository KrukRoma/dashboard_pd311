import React from "react";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.left}>
                    <p>&copy; {new Date().getFullYear()} My Site. Усі права захищено.</p>
                </div>
                <div style={styles.center}>
                    <a href="/privacy-policy" style={styles.link}>Політика конфіденційності</a>
                    <a href="/terms" style={styles.link}>Умови використання</a>
                </div>
                <div style={styles.right}>
                    <a href="https://facebook.com" style={styles.icon} target="_blank" rel="noopener noreferrer">🌐</a>
                    <a href="https://instagram.com" style={styles.icon} target="_blank" rel="noopener noreferrer">📸</a>
                    <a href="https://twitter.com" style={styles.icon} target="_blank" rel="noopener noreferrer">🐦</a>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: "#222",
        color: "#fff",
        padding: "20px 0",
        textAlign: "center",
        fontSize: "14px",
        position: "fixed", 
        bottom: "10px", 
        left: "0",
        width: "100%", 
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
    },
    left: {
        flex: 1,
        textAlign: "left",
    },
    center: {
        flex: 1,
        textAlign: "center",
    },
    right: {
        flex: 1,
        textAlign: "right",
    },
    link: {
        color: "#fff",
        margin: "0 10px",
        textDecoration: "none",
        fontSize: "14px",
    },
    icon: {
        color: "#fff",
        margin: "0 5px",
        fontSize: "18px",
        textDecoration: "none",
    },
};

export default Footer;
