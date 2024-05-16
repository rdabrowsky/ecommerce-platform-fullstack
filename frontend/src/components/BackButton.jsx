import { Link } from 'react-router-dom';

const BackButton = ({ title, props }) => {
  return (
    <Link to={document.referrer || '/'} className={'btn btn-light my-3'} {...props}>
      {title}
    </Link>
  );
};
export default BackButton;
