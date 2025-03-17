import CrumbIcons from '@/assets/icons/CrumbIcons';
import { GlobalContext } from '@/context/Provider';
import crumbApi, { CURRENCY, PHONE_NUMBER_LINK } from '@/utils/crumbApis';
import { Button, ConfigProvider, Grid, Modal } from 'antd'
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import productImage from '@/assets/images/product-placeholder-wp.jpg'
import { TypographyTitle } from '@/lib/AntRegistry';

const STAGING_URL = "https://coppercrumb.vercel.app"
const LIVE_URL = "https://coppercrumb.vercel.app"

const ShareProduct = (props: any) => {
    console.log(props,'proppspsp');
    
    const screens = Grid.useBreakpoint()
    const [modal2Open, setModal2Open] = useState(false);
    const { Toast } = useContext(GlobalContext)
    const router = useRouter()
    return <ConfigProvider>

        <Button className="border-0 shadow-none" role='button' onClick={() => setModal2Open(true)}>
            <CrumbIcons.Share />
            {!screens.md ? "":<span>Share</span>}
            
        </Button>
        <Modal
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
            footer={false}
        >
            <div className="boat-sharing px-4 py-2">
                <div className="row gy-3">
                    {/* heading */}
                    <div className="col-12">
                        <h3>{props?.title}</h3>
                    </div>
                    {/* content */}
                    <div className="col-12 py-2">
                        <div className="share-boat d-flex align-items-center gap-3">
                            <div className="share-boat-image">
                                <img onError={(e:any) => e.target.src = productImage.src} src={props?.img ?  crumbApi.FILES.imageOriginal(props?.img, productImage.src) : productImage.src} alt='img' className='img-fluid' />
                            </div>
                            <div className="share-boat-desc">
                                <p>{props?.name}</p>
                        <TypographyTitle level={5}>{CURRENCY}{props?.price}</TypographyTitle>

                            </div>
                        </div>
                    </div>
                    {/* Share link */}
                    <div className="col-sm-6">
                        <div className="social-button">
                            <a className='btn w-100 py-3 text-start' role='button' onClick={() => { navigator?.clipboard?.writeText(`${typeof window !== "undefined" && (window?.location?.origin?.includes("staging") || window?.location?.origin?.includes("localhost")) ? `${STAGING_URL}${router.asPath}` : `${LIVE_URL}${router.asPath}`}`); Toast.success(`Link copied successfully`) }} >
                                <CrumbIcons.ShareCopy />
                                <span className='ms-2'>Copy Link</span>
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="social-button">
                            <a className='btn w-100 py-3 text-start' href={`mailto:?subject=I absolutely loved ❤️ this product! ${props?.name} It's amazing, and I highly recommend checking it out ASAP. Don't miss&body=${typeof window !== "undefined" && (window?.location?.origin?.includes("staging") || window?.location?.origin?.includes("localhost")) ? `${STAGING_URL}${router.asPath}` : `${LIVE_URL}${router.asPath}`}`} >
                                <CrumbIcons.ShareGmail />
                                <span className='ms-2'>Email</span>
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="social-button">
                            <a onClick={() => typeof window !== "undefined" && (window?.location?.origin?.includes("staging") || window?.location?.origin?.includes("localhost")) ? (window as any).open(`https://wa.me?text=I absolutely loved ❤️ this product! ${props?.name} It's amazing, and I highly recommend checking it out ASAP. Don't miss : ${STAGING_URL}${router.asPath}`) : (window as any).open(`https://wa.me?text=I absolutely loved ❤️ this product! ${props?.name} It's amazing, and I highly recommend checking it out ASAP. Don't miss : ${STAGING_URL}${router.asPath}`)} className='btn w-100 py-3 text-start'>
                                <CrumbIcons.ShareWhatsApp />
                                <span className='ms-2'>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                    {/* <div className="col-sm-6">
                        <div className="social-button">
                            <a href={`http://www.facebook.com/dialog/send?app_id=${process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_APP_ID}&link=${typeof window !== "undefined" && (window?.location?.origin?.includes("staging") || window?.location?.origin?.includes("localhost")) ? `${STAGING_URL}${router.asPath}` : `${LIVE_URL}${router.asPath}`}&redirect_uri=${typeof window !== "undefined" && (window?.location?.origin?.includes("staging") || window?.location?.origin?.includes("localhost")) ? `${STAGING_URL}${router.asPath}` : `${LIVE_URL}${router.asPath}`}`} target="_blank" rel="noreferrer" className='btn w-100 py-3 text-start'>
                                <HenceforthIcons.ShareMessenger />
                                <span className='ms-2'>Messenger</span>
                            </a>

                        </div>
                    </div> */}
                    {/* <div className="col-sm-6">
                        <div className="social-button">
                            <a rel="noreferrer" target="_blank" className='btn w-100 py-3 text-start' href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" && (window?.location?.origin?.includes("staging") || window?.location?.origin?.includes("localhost")) ? `${STAGING_URL}${router.asPath}` : `${LIVE_URL}${router.asPath}`}`}>
                                <HenceforthIcons.ShareFacebook />
                                <span className='ms-2'>Facebook</span>
                            </a>
                        </div>
                    </div> */}
                    <div className="col-sm-6">
                        <div className="social-button">
                            <a rel="noreferrer" target="_blank" href={`https://www.twitter.com/share?text=${`I absolutely loved ❤️ this product! ${props.name} It's amazing, and I highly recommend checking it out ASAP. Don't miss :`}&url=${typeof window !== "undefined" && (window?.location?.origin?.includes("staging") || window?.location?.origin?.includes("localhost")) ? `${STAGING_URL}${router.asPath}` : `${LIVE_URL}${router.asPath}`}`} className='btn w-100 py-3 text-start'>
                                <CrumbIcons.ShareTwitter />
                                <span className='ms-2'>Twitter</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </ConfigProvider>
}

export default ShareProduct