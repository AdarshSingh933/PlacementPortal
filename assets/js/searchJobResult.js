function truncateDescription(description, maxWords) {
    const words = description.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...'; // Add ellipsis for truncated text
    } else {
      return description;
    }
  }