import logo from '../assets/pica-pau.jpg';

function AppHeader ({title}) {
  const HEADER_INFO = {
    imageUrl: logo,
    imageSize: 100,
    headlineText: title
  };

  return (
    <header>
      <img src={HEADER_INFO.imageUrl} width={HEADER_INFO.imageSize} height={HEADER_INFO.imageSize} alt=""/>
      <h1>{HEADER_INFO.headlineText}</h1>
      <img src={HEADER_INFO.imageUrl} width={HEADER_INFO.imageSize} height={HEADER_INFO.imageSize} alt="" className="mirror-image"/>
    </header>
  )
}

export default AppHeader;