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

export default {
    signup,
    validatePassword,
    checkUserExists
  }
  