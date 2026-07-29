import PropTypes from 'prop-types';

export const ProfileCover = ( {profile} ) => {
  return (
    <div
      style={{ backgroundImage: `url(${profile?.coverImage})` }}
      className="profile-cover"
    >
      <div className="profile-cover-layout"></div>
    </div>
  );
};

ProfileCover.propTypes = {
  profile: PropTypes.shape({
    coverImage: PropTypes.string,
  }),
};