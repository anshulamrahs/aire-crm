function joinListingWithCommaAnd(objects, key) {
    // Extract the values for the given key (e.g., 'label') from each object
    const labels = objects.map(obj => obj[key]);
  
    // If there's only one item, return it directly
    if (labels.length === 1) {
      return labels[0];
    }
  
    // Join all but the last item with a comma
    const allButLast = labels.slice(0, -1).join(', ');
  
    // Return the result with 'and' before the last item
    return `${allButLast} and ${labels[labels.length - 1]}`;
  }

  export default joinListingWithCommaAnd;