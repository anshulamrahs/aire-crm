function formatDate(apiDate) {
    const date = new Date(apiDate);
  
    // Get day, month, year
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
  
    // Get hours, minutes, seconds
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    // Determine AM or PM
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
  
    // Combine into desired format
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  }

  export function formatDateToDDMMYYYY(apiDate) {
    const date = new Date(apiDate);
  
    // Get day, month, year
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
  
    // Combine into desired format
    return `${day}/${month}/${year}`;
  }

  export default formatDate;