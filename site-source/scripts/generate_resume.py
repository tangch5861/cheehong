"""Generate the recruiter résumé from the same data file as the website."""
import json
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether

root = Path(__file__).resolve().parents[1]
r = json.loads((root / 'src/resume.json').read_text(encoding='utf-8-sig'))
out = root / 'public/Tang-Chee-Hong-Resume.pdf'
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='Name2',fontName='Helvetica-Bold',fontSize=24,leading=29,textColor=colors.HexColor('#234b40'),spaceAfter=8))
styles.add(ParagraphStyle(name='Section2',fontName='Helvetica-Bold',fontSize=12,leading=16,textColor=colors.HexColor('#234b40'),spaceBefore=16,spaceAfter=9))
styles.add(ParagraphStyle(name='Role2',fontName='Helvetica-Bold',fontSize=11,leading=15,spaceBefore=10,spaceAfter=4))
styles.add(ParagraphStyle(name='Body2',fontName='Helvetica',fontSize=9.5,leading=14,spaceAfter=6))
styles.add(ParagraphStyle(name='Small2',fontName='Helvetica',fontSize=8,leading=12,textColor=colors.HexColor('#555555'),spaceAfter=6))
styles.add(ParagraphStyle(name='Bullet2',parent=styles['Body2'],leftIndent=10,firstLineIndent=-8,spaceAfter=5))
def clean(s):
 return escape(s.replace('–','-').replace('—','-').replace('’',"'").replace('®',' (R)'))
def p(s,style='Body2'): return Paragraph(clean(s),styles[style])
story=[p(r['name'],'Name2'),p(r['title'],'Role2'),Paragraph(f'<link href="mailto:{r["email"]}">{r["email"]}</link> | {r["phone"]}',styles['Body2']),p(r['summary']),p('EDUCATION & PROFESSIONAL DEVELOPMENT','Section2')]
for e in r['education']:
 story.append(KeepTogether([p(f'{e["year"]} | {e["title"]}','Role2'),p(e['institution']),p(e['description'],'Small2')]))
story.append(p('SKILLS','Section2'))
for g in r['skillGroups']:
 story.append(p(g['name'],'Role2'));story.append(p(', '.join(g['items'])))
story.extend([p('LANGUAGES & INTERESTS','Section2'),p('Languages: '+', '.join(r['languages'])),p('Interests: '+', '.join(r['interests'])),PageBreak(),p('PROFESSIONAL EXPERIENCE','Section2')])
def role(r):
 result=[p(r['company'],'Role2'),p(r['role']+' | '+r['dates']),p(r['summary'])]
 if r.get('progression'):
  result.append(p('CAREER PROGRESSION','Role2'))
  result += [p(step['period']+' | '+step['title']) for step in r['progression']]
 result += [p('- '+b,'Bullet2') for b in r['bullets']]
 if r.get('achievements'):
  result.append(p('KEY ACHIEVEMENTS','Section2'))
  for a in r['achievements']:
   if a['year']=='2023': result.extend([PageBreak(),p(r['company']+' - ACHIEVEMENTS (CONTINUED)','Section2')])
   result.append(KeepTogether([p(a['year']+' | '+a['title'],'Role2'),p(a['description'])]))
 if r['projects']:result.append(p('Projects: '+', '.join(r['projects']),'Small2'))
 result += [p('Technologies: '+', '.join(r['skills']),'Small2'),p('Tools: '+', '.join(r['tools']),'Small2'),Spacer(1,9)]
 return result
for job in reversed(r['roles'][3:]): story.extend(role(job))
story.extend([p(r['sourceNote'],'Small2'),PageBreak(),p('PROFESSIONAL EXPERIENCE (CONTINUED)','Section2')])
for job in reversed(r['roles'][:3]): story.extend(role(job))
story.append(Paragraph('Source: <link href="'+r['source']+'">'+r['source']+'</link>',styles['Small2']))
def footer(canvas,doc):
 canvas.setStrokeColor(colors.HexColor('#d9ded3'));canvas.line(45,40,A4[0]-45,40)
 canvas.setFont('Helvetica',8);canvas.setFillColor(colors.HexColor('#666666'));canvas.drawString(45,27,r['name']);canvas.drawRightString(A4[0]-45,27,str(doc.page))
SimpleDocTemplate(str(out),pagesize=A4,rightMargin=45,leftMargin=45,topMargin=35,bottomMargin=52,title=r['name']+' - Resume',author=r['name']).build(story,onFirstPage=footer,onLaterPages=footer)
from pypdf import PdfReader
pdf=PdfReader(out)
text='\n'.join(page.extract_text() for page in pdf.pages)
assert all(job['company'] in text for job in r['roles'])
assert r['email'] in text
assert all(a['year'] in text and a['title'].replace('’', chr(39)) in text for a in r['roles'][-1]['achievements'])
assert 'Engineering Manager' in text
assert '2015-Current' not in text
print(f'Created {out.name}: {len(pdf.pages)} pages, selectable text verified.')

