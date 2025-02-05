{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ supabase \} from './supabaseConfig.js';\
\
export async function handleLogout() \{\
    try \{\
        const \{ error \} = await supabase.auth.signOut();\
        if (error) \{\
            console.error("Error logging out:", error.message);\
            alert("Failed to log out. Please try again.");\
        \} else \{\
            alert("Logged out successfully!");\
            window.location.href = "index.html"; // Redirect to homepage or login page\
        \}\
    \} catch (err) \{\
        console.error("Unexpected error during logout:", err);\
    \}\
\}\
\
// Add event listener to logout button\
document.addEventListener("DOMContentLoaded", () => \{\
    const logoutButton = document.getElementById("logoutButton");\
    if (logoutButton) \{\
        logoutButton.addEventListener("click", handleLogout);\
    \}\
\});}