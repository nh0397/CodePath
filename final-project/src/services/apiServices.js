import CryptoJS from "crypto-js";
import supabase from './supabaseClient';


export const checkUserExists = async (email) => {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, password')  // All column names in a single string
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
    const hashedPassword = CryptoJS.SHA256(newPassword).toString(); // Hash the new password

    const { data, error } = await supabase
        .from('users')
        .update({ password: hashedPassword })  // Updating the password field
        .eq('email', email);

    if (error) {
        throw new Error(error.message);
    }
    return data;  // Returns the updated user data
};
export default {
    signup,
    validatePassword,
    checkUserExists,
    resetPassword
  }
  