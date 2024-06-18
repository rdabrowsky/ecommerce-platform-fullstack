import { Link } from 'react-router-dom';

const BackButton = ({ title, url, props }) => {
  return (
    <Link className={'btn btn-light my-3'} {...props} to={url || '/'}>
      {title || 'Go back'}
    </Link>
  );
};
export default BackButton;
