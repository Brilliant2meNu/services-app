{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export async function handleLogin(phoneNumber, password, supabase) \{\
  if (!phoneNumber || !password) \{\
    return \{ error: "Phone number and password are required." \};\
  \}\
\
  const \{ data, error \} = await supabase\
    .from("users")\
    .select("*")\
    .eq("phone_number", phoneNumber)\
    .eq("password", password);\
\
  if (error || data.length === 0) \{\
    return \{ error: "Invalid login credentials." \};\
  \}\
\
  return \{ success: true, user: data[0] \};\
\}}