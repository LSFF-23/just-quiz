function AppHeader ({title}) {
  const HEADER_INFO = {
    imageUrl: "https://i.pinimg.com/originals/89/d2/d5/89d2d5077c8b120644c47cd0551d01f9.jpg",
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