export const formatDate = (dateString: string): string => {
  const parsedDate = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(parsedDate);

  return formattedDate;
};