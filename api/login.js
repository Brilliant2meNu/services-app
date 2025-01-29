<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/dist/umd/supabase.min.js"></script>
<script>
  const supabase = supabase.createClient(
    'https://ovmdpupofhhudxhitoov.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92bWRwdXBvZmhodWR4aGl0b292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMjQ1MjUsImV4cCI6MjA1MzYwMDUyNX0.r2SgtfiL8c4rTGcXOBPhU9csCztLLjP8ibEXat46gaM'
  );

  const loginForm = document.getElementById("loginForm");
  const errorElement = document.getElementById("error");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password);

      if (error || data.length === 0) {
        errorElement.textContent = "Invalid email or password.";
        return;
      }

      const userRole = data[0].role;
      if (userRole === "admin") {
        window.location.href = "/admin-dashboard.html";
      } else if (userRole === "premium") {
        window.location.href = "/premium-dashboard.html";
      } else {
        window.location.href = "/guest-dashboard.html";
      }
    } catch (err) {
      console.error(err);
      errorElement.textContent = "An error occurred. Please try again.";
    }
  });
</script>
