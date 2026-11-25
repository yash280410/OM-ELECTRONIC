/* =====================================================
   RS PHOTOGRAPHY
   SUPABASE CONNECTION
===================================================== */

const SUPABASE_URL =
    "https://dazguesfusfmvgfwuqnk.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_oZnvdj_k5vp8_gK_XLh3Lg_a3mgpJ4T";


/* =====================================================
   CREATE SUPABASE CLIENT
===================================================== */

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


console.log(
    "RS Photography: Supabase connected."
);