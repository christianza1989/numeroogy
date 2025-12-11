"use client";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { FullReport } from "../../types/analysis";

// Use system fonts for better compatibility
// Font.register({
//   family: "Playfair",
//   src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/PlayfairDisplay/PlayfairDisplay-Bold.ttf",
// });

// Font.register({
//   family: "Roboto",
//   src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
// });

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    fontFamily: "Roboto",
    paddingBottom: 60, // Space for footer
  },
  // --- COSMIC COVER PAGE ---
  coverPage: {
    backgroundColor: "#0f172a", // Dark Background
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
    fontSize: 12,
    letterSpacing: 4,
    color: "#a78bfa", // Purple-400
    marginBottom: 40,
    textTransform: "uppercase",
  },
  coverTitle: {
    fontFamily: "Playfair",
    fontSize: 42,
    textAlign: "center",
    color: "#ffffff",
    marginBottom: 10,
  },
  coverSubtitle: {
    fontSize: 16,
    color: "#fbbf24", // Gold
    textTransform: "uppercase",
    letterSpacing: 3,
    marginBottom: 50,
  },
  coverName: {
    fontFamily: "Playfair",
    fontSize: 32,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
    paddingVertical: 15,
    width: "80%",
  },
  coverDate: {
    position: "absolute",
    bottom: 50,
    fontSize: 10,
    color: "#64748b",
  },

  // --- CONTENT PAGES ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 35,
    marginTop: 35,
    marginBottom: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontFamily: "Playfair",
    fontSize: 10,
    color: "#6366f1", // Primary Color
    textTransform: "uppercase",
  },
  headerName: {
    fontSize: 9,
    color: "#94a3b8",
  },
  contentContainer: {
    paddingHorizontal: 40,
  },
  sectionTitle: {
    fontFamily: "Playfair",
    fontSize: 22,
    color: "#1e293b", // Slate-800
    marginTop: 25,
    marginBottom: 15,
  },
  blockTitle: {
    fontFamily: "Playfair",
    fontSize: 16,
    color: "#334155", // Slate-700
    marginTop: 20,
    marginBottom: 8,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.8, // More breathable line height
    color: "#334155", // Slate-700
    marginBottom: 12,
    textAlign: "justify",
  },
  divider: {
    width: 30,
    height: 3,
    backgroundColor: "#fbbf24", // Gold accent
    marginBottom: 20,
    marginTop: 5,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: "#cbd5e1",
  },
  pageNumber: {
    fontSize: 9,
    color: "#6366f1",
    fontFamily: "Playfair",
  },
  // Decorative elements
  decorativeCircleOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorativeCircleInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.5)',
  },
  birthDateText: {
    marginTop: 15,
    fontSize: 12,
    color: "#94a3b8",
  },
  // Icon styles
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    fontSize: 16,
    color: '#fbbf24',
    marginRight: 10,
  },
  // Planetary Grid styles
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  gridItem: {
    width: '30%', // 3 columns
    backgroundColor: '#f8fafc',
    padding: 10,
    marginBottom: 10,
    marginRight: '3%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 8,
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 4,
    fontFamily: 'Roboto',
  },
  gridValue: {
    fontSize: 12,
    fontFamily: 'Playfair',
    color: '#1e293b',
    fontWeight: 'bold',
  },
});

// Icon Mapper (Simple Text/Emoji version for stability)
const getIcon = (iconName?: string) => {
  switch(iconName) {
    case 'sun': return "☀";
    case 'moon': return "☾";
    case 'heart': return "❤";
    case 'star': return "★";
    case 'fire': return "🔥";
    default: return "✦";
  }
};

// Helper function to clean markdown text
const cleanText = (text: string) => {
  return text
    .replace(/#{1,6}\s?/g, "") // Remove headings #
    .replace(/\*\*/g, "") // Remove bold **
    .replace(/\*/g, "") // Remove italics *
    .replace(/`/g, ""); // Remove code blocks
};

interface PdfProps {
  data: FullReport;
}

export const NumerologyReportPdf = ({ data }: PdfProps) => (
  <Document>
    {/* COVER PAGE (Use data.meta) */}
    <Page size="A4" style={styles.coverPage}>
      <Text style={styles.coverLogo}>NUMEROLOGY.LT</Text>
      
      {/* Decorative Circle */}
      <View style={styles.decorativeCircleOuter}>
         <View style={styles.decorativeCircleInner} />
      </View>

      <Text style={styles.coverTitle}>Asmeninė Analizė</Text>
      <Text style={styles.coverSubtitle}>KOSMOSO KODAS</Text>
      
      <Text style={styles.coverName}>{data.meta.user}</Text>
      
      <Text style={styles.birthDateText}>
        Gimimo data: {data.meta.birthDate}
      </Text>

      <Text style={styles.coverDate}>
        © {new Date().getFullYear()} Numerology.lt | Generuota su AI
      </Text>
    </Page>

    {/* PLANETARY DATA PAGE */}
    {data.planetaryData && (
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.headerTitle}>Planetų Išsidėstymas</Text>
          <Text style={styles.headerName}>{data.meta.user}</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Jūsų Kosminis Pasas</Text>
          
          <View style={styles.gridContainer}>
            {[
              { label: "Saulė (Esmė)", value: data.planetaryData?.sun },
              { label: "Mėnulis (Emocijos)", value: data.planetaryData?.moon },
              { label: "Merkurijus (Protas)", value: data.planetaryData?.mercury },
              { label: "Venera (Meilė)", value: data.planetaryData?.venus },
              { label: "Marsas (Veiksmas)", value: data.planetaryData?.mars },
              { label: "Jupiteris (Sėkmė)", value: data.planetaryData?.jupiter },
              { label: "Saturnas (Karma)", value: data.planetaryData?.saturn },
              { label: "Gyvenimo Kelias", value: data.planetaryData?.lifePath.toString() },
              { label: "Sielos Skaičius", value: data.planetaryData?.soulUrge.toString() },
            ].map((item, i) => (
              <View key={i} style={styles.gridItem}>
                <Text style={styles.gridLabel}>{item.label}</Text>
                <Text style={styles.gridValue}>{item.value}</Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.paragraph}>
            Ši lentelė rodo tikslią planetų padėtį jūsų gimimo akimirką. Tai yra jūsų unikalus kosminis antspaudas, kuris niekada nepasikartoja. Toliau pateikiama išsami šių rodiklių analizė.
          </Text>
        </View>
        
        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Numerology.lt - Jūsų asmeninis gidas</Text>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    )}

    {/* DYNAMIC CONTENT PAGES */}
    {data.sections.map((section, index) => (
      <Page key={index} size="A4" style={styles.page} wrap>
        <View style={styles.header} fixed>
           <Text style={styles.headerTitle}>{section.title}</Text>
           <Text style={styles.headerName}>{data.meta.user}</Text>
        </View>

        <View style={styles.contentContainer}>
          {section.blocks.map((block, bIndex) => (
            <View key={bIndex} wrap={false} style={{ marginBottom: 20 }}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>
                  {getIcon(block.icon)}
                </Text>
                <Text style={styles.blockTitle}>{block.title}</Text>
              </View>
              <Text style={styles.paragraph}>{cleanText(block.content)}</Text>
            </View>
          ))}
        </View>
        
        {/* Footer */}
        <View style={styles.footer} fixed>
           <Text style={styles.footerText}>Numerology.lt - Jūsų asmeninis gidas</Text>
           <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    ))}
  </Document>
);
