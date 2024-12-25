export const registrationUser = async (formData) => {
    const {username, email, password} = formData;
  await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({username, email, password}),
    headers: { "Content-Type": "application/json" },
  });
  console.log(formData);
};
