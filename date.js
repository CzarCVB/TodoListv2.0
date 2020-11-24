//jshint esversion:6

exports.getDate = function() {

  const today = new Date();

  const options = {
    weekday: "long",
    day: "2-digit",
    month:"long",
  };

  return today.toLocaleDateString("en-US", options);

};

