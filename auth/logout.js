export default function handler(req, res) {
  console.log("Logout API Called");

  res.status(200).json({ message: "Logged out successfully" });
}
