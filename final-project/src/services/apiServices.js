import CryptoJS from "crypto-js";
import supabase from './supabaseClient';

export const checkUserExists = async (email) => {
    const { data, error } = await supabase
        .from('users')
        .select('id, email, first_name, last_name, password')
        .eq('email', email)
        .single();

    return { data, error };
};

export const signup = async (firstName, lastName, email, hashedPassword) => {
    const exists = await checkUserExists(email);
    if (exists.data) {
        return { error: { message: 'Email is already in use' } };
    }

    const { data, error } = await supabase.from('users').insert([
        { first_name: firstName, last_name: lastName, email, password: hashedPassword }
    ]);

    return { data, error };
};

export const validatePassword = (hashedPassword, storedHashedPassword) => {
    return hashedPassword === storedHashedPassword;
};

export const resetPassword = async (email, newPassword) => {
    const hashedPassword = CryptoJS.SHA256(newPassword).toString();

    const { data, error } = await supabase
        .from('users')
        .update({ password: hashedPassword })
        .eq('email', email);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const addPost = async (userId, title, description, imageUrl) => {
    try {
        // Get current UTC timestamp
        const currentDateUTC = new Date().toISOString();
        
        // Convert UTC timestamp to local time
        const currentDateLocal = new Date(currentDateUTC).toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
        
        // Send query to insert data into the Posts table
        const { data, error } = await supabase
            .from('posts')
            .insert([{ 
                userid: userId, 
                title, 
                description, 
                imageurl: imageUrl,
                createdat: currentDateLocal, // Include current local timestamp for createdat field
                updatedat: currentDateLocal // Include current local timestamp for updatedat field
            }]);
        
        return { data, error };
    } catch (error) {
        console.error('Error inserting data:', error.message);
        return { error };
    }
};


export const getPosts = async () => {
  try {
    // Send SQL query to fetch posts data with nested user details
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id, 
        title, 
        description, 
        likes, 
        dislikes, 
        createdat, 
        updatedat, 
        imageurl,
        users( id, first_name, last_name)
      `);

    // Return the fetched data or any error
    return { data, error };
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error fetching posts:', error.message);
    return { error };
  }
};


export default {
    signup,
    validatePassword,
    checkUserExists,
    resetPassword,
    addPost,
    getPosts,
};
