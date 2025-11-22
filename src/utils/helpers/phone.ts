export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // If it starts with 0, convert to +234 format
  if (cleaned.startsWith('0')) {
    return '+234' + cleaned.slice(1);
  }
  
  // If it starts with 234, add the +
  if (cleaned.startsWith('234')) {
    return '+' + cleaned;
  }
  
  // If it already has +, return as is
  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  
  // Default: assume it's a Nigerian number and format accordingly
  return '+234' + cleaned;
};