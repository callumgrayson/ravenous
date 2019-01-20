const apiKey = 'UKyfSJbt7p23DB2koF56uMEKpmLshwjnmjJHAGxk_WxXgbl86r_z2xMvQ9t36GBKpNUIB6MDZQVibIkRhloYgBDvnvfm1_TsOMiiA9kq_5aU0jCeOh3wRl3oKnCcWnYx';

const Yelp = {
  search(term, location, sortBy) {
    // console.log(`Search arguments: ${term}, ${location}, ${sortBy}`);
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => ({
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count,
              latitude: business.coordinates.latitude,
              longitude: business.coordinates.longitude,
              url: business.url
          })
        );
      }
    })
  }
};

export default Yelp;
