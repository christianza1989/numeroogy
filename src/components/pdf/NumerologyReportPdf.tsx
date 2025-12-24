"use client";
import { Document, Page, Text, View, StyleSheet, Font, Svg, Path } from "@react-pdf/renderer";
import { FullReport } from "../../types/analysis";
import { HeroSection, CoreDescriptionBox, TwoColumnLayout, IconHeader, renderMarkdown } from "./ui/PdfComponents";
import { getIconPath } from "./ui/PdfIcons";
import { capitalizeName } from "../../lib/utils";

// ---------------------------------------------------------------------------
// 1. ŠRIFTŲ REGISTRACIJA (STABILUS CDN)
// ---------------------------------------------------------------------------

Font.register({
  family: "Roboto",
  fonts: [
    { 
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", 
      fontWeight: 400 
    },
    { 
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", 
      fontWeight: 700 
    },
  ]
});

Font.register({
  family: "RobotoBold",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
});

Font.register({
  family: "PlayfairDisplay",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
  fontWeight: 700,
});

// ---------------------------------------------------------------------------
// 2. STILIAI
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    fontFamily: "Roboto",
    paddingBottom: 50,
    paddingTop: 30,
  },
  // --- VIRŠELIS (BE BORDERIO) ---
  coverPage: {
    backgroundColor: "#0f172a",
    color: "white",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  coverLogo: {
    fontSize: 10,
    letterSpacing: 4,
    color: "#a78bfa",
    marginBottom: 60,
    textTransform: "uppercase",
  },
  coverTitle: {
    fontFamily: "RobotoBold",
    fontSize: 48,
    textAlign: "center",
    color: "#ffffff",
    marginBottom: 10,
  },
  coverSubtitle: {
    fontSize: 14,
    color: "#fbbf24",
    textTransform: "uppercase",
    letterSpacing: 4,
    marginBottom: 50,
  },
  coverName: {
    fontFamily: "RobotoBold",
    fontSize: 32,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 30,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    width: "100%",
  },
  coverDate: {
    position: "absolute",
    bottom: 40,
    fontSize: 9,
    color: "#64748b",
  },
  giftTag: {
    position: "absolute",
    top: 40,
    right: 0,
    backgroundColor: "#fbbf24",
    color: "#0f172a",
    paddingVertical: 6,
    paddingHorizontal: 30,
    fontSize: 10,
    fontFamily: "RobotoBold",
    textTransform: "uppercase",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  
  // --- STRUKTŪRA ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 40,
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 9,
    fontFamily: "RobotoBold",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contentContainer: {
    paddingHorizontal: 40,
  },
  
  // --- ELEMENTAI ---
  elementsWrapper: {
    marginTop: 5,     // Sumažinta
    marginBottom: 15, // Sumažinta
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  elementItem: {
    width: '48%',
  },
  elementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  elementLabel: {
    fontSize: 10,
    color: '#334155',
    fontFamily: "RobotoBold",
  },
  elementValue: {
    fontSize: 10,
    fontFamily: "RobotoBold",
  },
  barContainer: {
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  
  // --- LENTELĖS ---
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    width: '32%',
    backgroundColor: '#ffffff',
    padding: 8,       // Sumažinta (buvo 12)
    marginBottom: 8,  // Sumažinta (buvo 10)
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 8,
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  gridValue: {
    fontSize: 12,
    fontFamily: "RobotoBold",
    color: '#0f172a',
    textAlign: 'center',
  },
  
  // --- TEKSTAI ---
  sectionTitle: {
    fontFamily: "RobotoBold",
    fontSize: 24,
    color: "#1e293b",
    marginBottom: 15, // Sumažinta
    borderLeftWidth: 3,
    borderLeftColor: '#8b5cf6',
    paddingLeft: 10,
  },
  subTitle: {
    fontSize: 13,     // Šiek tiek mažesnis šriftas (buvo 14)
    fontFamily: "RobotoBold",
    color: "#334155",
    marginBottom: 10,
    marginTop: 5,     // Sumažinta
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#334155',
    marginBottom: 10,
    textAlign: 'justify'
  },
  
  // --- ASPEKTAI ---
  aspectTable: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  aspectHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  aspectRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  aspectCell: {
    width: '33%',
    fontSize: 9,
    color: '#334155',
  },
  
  // --- FOOTER ---
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  footerText: {
    fontSize: 8,
    color: "#cbd5e1",
  },
  // Pridedame stilių sezonams
  seasonBox: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#6366f1',
  },
  seasonTitle: {
    fontSize: 11,
    fontFamily: "RobotoBold",
    color: '#1e293b',
    marginBottom: 4,
  },
  shadowTitle: {
    fontSize: 18,
    fontFamily: "PlayfairDisplay",
    color: "#4c1d95", // Deep purple
    marginBottom: 10,
  }
});

// Helperis saugiam teksto atvaizdavimui
const safeText = (text: unknown, fallback = "-") => {
  if (text === null || text === undefined) return fallback;
  return String(text);
};

export const NumerologyReportPdf = ({ data }: { data: FullReport }) => (
  <Document>
    {/* 1. VIRŠELIS */}
    <Page size="A4" style={styles.coverPage}>
      {/* Pašalinome coverBorder, kad nelūžtų */}
      
      <Text style={styles.coverLogo}>LIKIMOKNYGA.LT</Text>
      
      {/* ZODIAKO SVG IKONA */}
      <View style={{ marginBottom: 50, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 140, height: 140, borderRadius: 70, borderWidth: 1, borderColor: 'rgba(167, 139, 250, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 110, height: 110, borderRadius: 55, backgroundColor: 'rgba(255,255,255,0.05)', position: 'absolute' }} />
              <Svg width={70} height={70} viewBox="0 0 24 24">
                  <Path d={getIconPath(data.meta.zodiacSignEng)} stroke="#fbbf24" strokeWidth={1} fill="none" />
              </Svg>
          </View>
      </View>

      <Text style={styles.coverTitle}>Likimo Knyga</Text>
      <Text style={styles.coverSubtitle}>KOSMOSO KODAS</Text>
      
      <Text style={styles.coverName}>{capitalizeName(data.meta.user)}</Text>
      
      <View style={{ marginTop: 30, alignItems: 'center' }}>
        {data.meta.isGift && data.meta.giver ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 2 }}>Paruošta Nuo</Text>
            <Text style={{ fontSize: 16, color: '#fbbf24', fontFamily: "RobotoBold" }}>{data.meta.giver}</Text>
            {/* PROGA PANAIKINTA */}
          </View>
        ) : (
          <Text style={{ fontSize: 12, color: "#94a3b8" }}>Gimimo data: {data.meta.birthDate}</Text>
        )}
      </View>
      
      {data.meta.isGift && (
        <View style={styles.giftTag}>
          <Text>DOVANA</Text>
        </View>
      )}
    
      <Text style={styles.coverDate}>
        © {new Date().getFullYear()} Likimoknyga.lt | Generuota su AI
      </Text>
    </Page>

    {/* 2. KOSMINIS PASAS (SUJUNGTAS) */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <Text style={styles.headerTitle}>KOSMINIS PASAS</Text>
        <Text style={styles.headerTitle}>{capitalizeName(data.meta.user)}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Jūsų Kosminė Matrica</Text>
        
        {/* ELEMENTŲ BALANSAS */}
        {data.planetaryData?.elements && (
          <View style={styles.elementsWrapper} wrap={false}>
            <Text style={styles.subTitle}>Temperamentas ir Energija</Text>
            <View style={styles.elementRow}>
              <View style={styles.elementItem}>
                <View style={styles.elementHeader}><Text style={styles.elementLabel}>Ugnis</Text><Text style={styles.elementValue}>{data.planetaryData.elements.fire}%</Text></View>
                <View style={styles.barContainer}><View style={{ height: '100%', width: `${data.planetaryData.elements.fire}%`, backgroundColor: '#ef4444' }} /></View>
              </View>
              <View style={styles.elementItem}>
                <View style={styles.elementHeader}><Text style={styles.elementLabel}>Žemė</Text><Text style={styles.elementValue}>{data.planetaryData.elements.earth}%</Text></View>
                <View style={styles.barContainer}><View style={{ height: '100%', width: `${data.planetaryData.elements.earth}%`, backgroundColor: '#10b981' }} /></View>
              </View>
            </View>
            <View style={styles.elementRow}>
              <View style={styles.elementItem}>
                <View style={styles.elementHeader}><Text style={styles.elementLabel}>Oras</Text><Text style={styles.elementValue}>{data.planetaryData.elements.air}%</Text></View>
                <View style={styles.barContainer}><View style={{ height: '100%', width: `${data.planetaryData.elements.air}%`, backgroundColor: '#3b82f6' }} /></View>
              </View>
              <View style={styles.elementItem}>
                <View style={styles.elementHeader}><Text style={styles.elementLabel}>Vanduo</Text><Text style={styles.elementValue}>{data.planetaryData.elements.water}%</Text></View>
                <View style={styles.barContainer}><View style={{ height: '100%', width: `${data.planetaryData.elements.water}%`, backgroundColor: '#8b5cf6' }} /></View>
              </View>
            </View>
          </View>
        )}

        {/* ASPEKTAI - Sutrumpiname tarpą virš lentelės */}
        {data.planetaryData?.aspects && (
          <View style={{ marginBottom: 20 }} wrap={false}>
            <Text style={styles.subTitle}>Pagrindiniai Aspektai</Text>
            <View style={styles.aspectTable}>
              <View style={styles.aspectHeader}>
                <Text style={[styles.aspectCell, { fontFamily: "RobotoBold" }]}>Planeta 1</Text>
                <Text style={[styles.aspectCell, { fontFamily: "RobotoBold" }]}>Planeta 2</Text>
                <Text style={[styles.aspectCell, { fontFamily: "RobotoBold" }]}>Ryšys</Text>
              </View>
              {data.planetaryData.aspects.map((aspect, i) => (
                <View key={i} style={styles.aspectRow}>
                  <Text style={styles.aspectCell}>{aspect.p1}</Text>
                  <Text style={styles.aspectCell}>{aspect.p2}</Text>
                  <Text style={[styles.aspectCell, { color: aspect.color }]}>{aspect.type}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* POZICIJOS IR MATRICA ŠALIA ARBA VIENA PO KITOS */}
        <View wrap={false}>
          <Text style={styles.subTitle}>Planetų Pozicijos</Text>
          <View style={styles.gridContainer}>
              {[
                { label: "Saulė (Esmė)", value: data.planetaryData?.sun },
                { label: "Mėnulis (Emocijos)", value: data.planetaryData?.moon },
                { label: "Merkurijus (Protas)", value: data.planetaryData?.mercury },
                { label: "Venera (Meilė)", value: data.planetaryData?.venus },
                { label: "Marsas (Veiksmas)", value: data.planetaryData?.mars },
                { label: "Jupiteris (Sėkmė)", value: data.planetaryData?.jupiter },
              ].map((item, i) => (
                <View key={`astro-${i}`} style={styles.gridItem}>
                  <Text style={styles.gridLabel}>{item.label}</Text>
                  <Text style={styles.gridValue}>{safeText(item.value)}</Text>
                </View>
              ))}
          </View>
        </View>

        <View wrap={false} style={{ marginTop: 10 }}>
          <Text style={styles.subTitle}>Numerologinė Matrica</Text>
          <View style={styles.gridContainer}>
            {[
              { label: "Gyvenimo Kelias", value: data.planetaryData?.lifePath.toString() },
              { label: "Likimo Skaičius", value: data.planetaryData?.expression?.toString() },
              { label: "Sielos Norai", value: data.planetaryData?.soulUrge.toString() },
              { label: "Asmenybė", value: data.planetaryData?.personality?.toString() },
              { label: "Metų Ciklas", value: data.planetaryData?.personalYear?.toString() },
            ].map((item, i) => (
              <View key={`num-${i}`} style={styles.gridItem}>
                <Text style={styles.gridLabel}>{item.label}</Text>
                <Text style={styles.gridValue}>{safeText(item.value)}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      
      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>Likimoknyga.lt</Text>
        <Text style={{ fontSize: 9, color: "#6366f1" }} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </View>
    </Page>

    {/* 3. TAPATYBĖ */}
    {data.structuredData?.identity && (
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.headerTitle}>TAVO KOSMINĖ TAPATYBĖ</Text>
          <Text style={styles.headerTitle}>{capitalizeName(data.meta.user)}</Text>
        </View>

        <View style={styles.contentContainer}>
          <HeroSection 
            archetype={data.structuredData.identity.archetype}
            keywords={data.structuredData.identity.keywords}
            zodiacSignEng={data.meta.zodiacSignEng}
          />
          <CoreDescriptionBox description={data.structuredData.identity.coreDescription} />
          <TwoColumnLayout 
            strengths={data.structuredData.identity.strengths}
            challenges={data.structuredData.identity.challenges}
          />
        </View>
        
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Likimoknyga.lt</Text>
          <Text style={{ fontSize: 9, color: "#6366f1" }} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    )}

    {/* 4. EMOCIJOS */}
    {data.structuredData?.emotions && (
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.headerTitle}>EMOCIJOS IR SANTYKIAI</Text>
          <Text style={styles.headerTitle}>{capitalizeName(data.meta.user)}</Text>
        </View>

        <View style={styles.contentContainer}>
          <View wrap={false}>
            <IconHeader title="Tavo Meilės Kalba (Venera)" iconName="heart" />
            <CoreDescriptionBox description={data.structuredData.emotions.loveStyle} />
          </View>

          <View style={{ marginTop: 30 }} wrap={false}>
            <IconHeader title="Vidiniai Poreikiai (Mėnulis)" iconName="moon" />
            <Text style={styles.paragraph}>{renderMarkdown(data.structuredData.emotions.emotionalNeeds)}</Text>
          </View>

          <View style={{ marginTop: 30, backgroundColor: '#fff1f2', padding: 20, borderRadius: 12 }} wrap={false}>
             <Text style={[styles.subTitle, { color: '#be123c', marginBottom: 10, marginTop: 0 }]}>Idealus Partneris Tau</Text>
             {data.structuredData.emotions.idealPartnerIds.map((trait: string, i: number) => (
                <View key={i} style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' }}>
                  <Text style={{ color: '#be123c', fontSize: 12, marginRight: 8 }}>♥</Text>
                  <Text style={{ flex: 1, fontSize: 10, color: '#334155' }}>{renderMarkdown(trait)}</Text>
                </View>
             ))}
          </View>
        </View>
        
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Likimoknyga.lt</Text>
          <Text style={{ fontSize: 9, color: "#6366f1" }} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    )}

    {/* 5. NAUJA SEKCIJA: SIELOS ŠEŠĖLIAI IR GYDYMAS */}
    {data.structuredData?.soulShadow && (
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.headerTitle}>PASĄMONĖ IR SIELA</Text>
          <Text style={styles.headerTitle}>{capitalizeName(data.meta.user)}</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Tavo Sielos Gelmės</Text>
          
          {/* LILITH */}
          <View style={{ marginBottom: 30 }} wrap={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <Text style={{ color: 'white', fontSize: 14, fontFamily: 'RobotoBold' }}>☾</Text> 
                </View>
                <Text style={styles.shadowTitle}>Juodasis Mėnulis (Lilith)</Text>
            </View>
            
            <View style={{ backgroundColor: '#f3f4f6', padding: 15, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#1e293b' }}>
                <Text style={{ fontSize: 12, fontFamily: 'RobotoBold', color: '#1e293b', marginBottom: 5 }}>
                    {data.structuredData.soulShadow.lilith.title}
                </Text>
                <Text style={styles.paragraph}>
                    {renderMarkdown(data.structuredData.soulShadow.lilith.description)}
                </Text>
            </View>
          </View>

          {/* CHIRON */}
          <View style={{ marginBottom: 30 }} wrap={false}>
             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#059669', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <Text style={{ color: 'white', fontSize: 14, fontFamily: 'RobotoBold' }}>⚷</Text> 
                </View>
                <Text style={[styles.shadowTitle, { color: '#047857' }]}>Chironas - Gydytojas</Text>
            </View>

            <View style={{ backgroundColor: '#ecfdf5', padding: 15, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#059669' }}>
                <Text style={{ fontSize: 12, fontFamily: 'RobotoBold', color: '#065f46', marginBottom: 5 }}>
                    {data.structuredData.soulShadow.chiron.title}
                </Text>
                <Text style={styles.paragraph}>
                    {renderMarkdown(data.structuredData.soulShadow.chiron.description)}
                </Text>
            </View>
          </View>
          
          <CoreDescriptionBox description="Šie aspektai parodo jūsų paslėptas galias. Lilith atskleidžia, kur esate nepriklausoma ir laukinė, o Chironas rodo, kur slypi jūsų didžiausią žaizdę, kurią išgydžiusi tampate mokytoja kitiems." />

        </View>
        <View style={styles.footer} fixed><Text style={styles.footerText}>Likimoknyga.lt</Text></View>
      </Page>
    )}

    {/* 6. KARMA IR KARJERA */}
    {data.structuredData?.karmaCareer && (
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.headerTitle}>KARMA IR KARJERA</Text>
          <Text style={styles.headerTitle}>{capitalizeName(data.meta.user)}</Text>
        </View>

        <View style={styles.contentContainer}>
          <View wrap={false}>
            <IconHeader title="Karmos Pamoka (Saturnas)" iconName="saturn" />
            <View style={{ backgroundColor: '#fef3c7', padding: 15, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#f59e0b', marginTop: 10 }}>
              <Text style={{ fontSize: 11, fontFamily: "RobotoBold", color: '#92400e', marginBottom: 5 }}>
                {data.structuredData.karmaCareer.saturnLesson.title}
              </Text>
              <Text style={styles.paragraph}>
                {renderMarkdown(data.structuredData.karmaCareer.saturnLesson.desc)}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 30 }} wrap={false}>
            <IconHeader title="Karjeros Energija" iconName="mars" />
            <View style={{ backgroundColor: '#f0f9ff', padding: 15, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#3b82f6', marginTop: 10 }}>
              <Text style={{ fontSize: 11, fontFamily: "RobotoBold", color: '#1d4ed8', marginBottom: 8 }}>
                {data.structuredData.karmaCareer.careerPath.title}
              </Text>
              <Text style={[styles.paragraph, { marginBottom: 15 }]}>
                {renderMarkdown(data.structuredData.karmaCareer.careerPath.description)}
              </Text>
              <Text style={{ fontSize: 10, fontFamily: "RobotoBold", color: '#334155', marginBottom: 8 }}>Karjeros Stiprybės:</Text>
              {data.structuredData.karmaCareer.careerPath.strengths.map((strength: string, i: number) => (
                <View key={i} style={{ flexDirection: 'row', marginBottom: 6, alignItems: 'flex-start' }}>
                  <Text style={{ color: '#3b82f6', fontSize: 12, marginRight: 8 }}>•</Text>
                  <Text style={{ flex: 1, fontSize: 10, color: '#334155' }}>{renderMarkdown(strength)}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Likimoknyga.lt</Text>
          <Text style={{ fontSize: 9, color: "#6366f1" }} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    )}

    {/* 7. ATEITIES PROGNOZĖ (IŠPLĖSTA) */}
    {data.structuredData?.future && (
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.headerTitle}>2026 METŲ PROGNOZĖ</Text>
          <Text style={styles.headerTitle}>{capitalizeName(data.meta.user)}</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={{ backgroundColor: '#f0fdf4', padding: 20, borderRadius: 12, marginBottom: 25, textAlign: 'center' }} wrap={false}>
            <Text style={{ fontSize: 20, fontFamily: "RobotoBold", color: '#166534', marginBottom: 5 }}>
              {data.structuredData.future.personalYearTitle}
            </Text>
            <Text style={{ fontSize: 9, color: '#15803d', textTransform: 'uppercase', letterSpacing: 2 }}>
              Asmeniniai Metai
            </Text>
          </View>

          <CoreDescriptionBox description={data.structuredData.future.forecast} />

          <View style={{ marginTop: 20 }}>
            <Text style={[styles.subTitle, { marginBottom: 15 }]}>Jūsų Metų Kalendorius</Text>
            
            {data.structuredData.future.seasons && data.structuredData.future.seasons.map((season: { title: string; content: string }, i: number) => (
               <View key={i} style={{ marginBottom: 12, padding: 10, backgroundColor: '#f8fafc', borderRadius: 6, borderLeftWidth: 3, borderLeftColor: '#6366f1' }} wrap={false}>
                  <Text style={{ fontSize: 11, fontFamily: "RobotoBold", color: '#1e293b', marginBottom: 3 }}>{season.title}</Text>
                  <Text style={styles.paragraph}>{renderMarkdown(season.content)}</Text>
               </View>
            ))}
          </View>
        </View>
        
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Likimoknyga.lt</Text>
          <Text style={{ fontSize: 9, color: "#6366f1" }} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    )}

    {/* 8. NAUJAS PUSLAPIS: FINALINĖ IŠVADA */}
    {data.structuredData?.future?.yearConclusion && (
      <Page size="A4" style={styles.coverPage}>
        {/* Naudojame coverPage stilių, kad būtų tamsus fonas pabaigai - labai efektinga */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }}>
           
           <View style={{ marginBottom: 40 }}>
              <Svg width={60} height={60} viewBox="0 0 24 24">
                  <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#fbbf24" strokeWidth={1} fill="none" />
              </Svg>
           </View>

           <Text style={{ fontFamily: "PlayfairDisplay", fontSize: 28, color: "white", marginBottom: 30, textAlign: 'center' }}>
             Tavo Kelias Į Šviesą
           </Text>
           
           <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 30, borderRadius: 10 }}>
              <Text style={{ fontFamily: "Roboto", fontSize: 12, color: "#e2e8f0", lineHeight: 1.8, textAlign: 'center' }}>
                {renderMarkdown(data.structuredData.future.yearConclusion)}
              </Text>
           </View>

           <Text style={{ marginTop: 60, fontSize: 10, color: "#9ca3af", letterSpacing: 2 }}>
             SU MEILE, LIKIMOKNYGA.LT
           </Text>
        </View>
      </Page>
    )}
  </Document>
);
