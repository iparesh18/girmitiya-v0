import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ContactForm from '../components/ContactForm';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import SectionHeading from '../components/common/SectionHeading';
import { contactCards, images } from '../data/siteData';

export default function Contact() {
  const contactMapContainerRef = useRef(null);

  useEffect(() => {
    if (!contactMapContainerRef.current) return;

    // Centered at New Delhi, India
    const officeLatLng = [28.6139, 77.2090];
    
    const contactMap = L.map(contactMapContainerRef.current, {
      center: officeLatLng,
      zoom: 14,
      scrollWheelZoom: false,
      zoomControl: false
    });

    // Add Voyager tiles (warm cream map)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(contactMap);

    // Zoom control at top right
    L.control.zoom({ position: 'topright' }).addTo(contactMap);

    // Custom DivIcon for Office Pin
    const officeMarkerHtml = `
      <div class="relative flex items-center justify-center cursor-pointer">
        <span class="absolute inline-flex h-10 w-10 rounded-full bg-[#7f1d1d]/30 animate-pulse"></span>
        <span class="absolute inline-flex h-7 w-7 rounded-full bg-[#7f1d1d]/20"></span>
        <div class="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#7f1d1d] text-white shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
      </div>
    `;

    const officeMarker = L.marker(officeLatLng, {
      icon: L.divIcon({
        className: 'custom-office-marker',
        html: officeMarkerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })
    }).addTo(contactMap);

    officeMarker.bindPopup(`
      <div style="font-family: 'Inter', sans-serif; font-size: 13px; color: #241811; max-width: 220px; padding: 4px;">
        <h4 style="margin: 0 0 4px 0; color: #7f1d1d; font-weight: bold; font-size: 14px;">Girmitiya Foundation</h4>
        <p style="margin: 0; line-height: 1.45; color: #5f3b24;">New Delhi, Delhi 110001, India</p>
        <p style="margin: 6px 0 0 0; font-size: 11px; font-weight: bold; color: #d97706; text-transform: uppercase; tracking: 0.05em;">NGO Headquarters Office</p>
      </div>
    `, {
      offset: [0, -10]
    }).openPopup();

    return () => {
      contactMap.remove();
    };
  }, []);

  return (
    <>
      <PageHeader eyebrow="Contact" title="Start a conversation with Girmitiya Foundation." text="Reach out for membership, donations, volunteering, root search guidance, publications, partnerships, or program support." image={images.about} />
      <section className="py-20">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading align="left" eyebrow="Get In Touch" title="We would be glad to hear from you." text="Use the form or contact details below. Our community representatives respond to messages as quickly as possible." />
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="p-5">
                    <Icon className="text-primary" />
                    <h3 className="mt-3 font-display text-2xl font-bold text-primary">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-earth/80">{item.value}</p>
                  </Card>
                );
              })}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <section className="pb-20">
        <div className="container-pad">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-primary/12 bg-white/40 p-4 shadow-premium backdrop-blur">
            <h2 className="mb-4 font-display text-2xl font-bold text-primary pl-2">Office Location</h2>
            <div className="relative overflow-hidden rounded-[1.8rem] border border-primary/12 shadow-inner" style={{ minHeight: '28rem' }}>
              <div ref={contactMapContainerRef} className="absolute inset-0 h-full w-full" style={{ zIndex: 1 }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
