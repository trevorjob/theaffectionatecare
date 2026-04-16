import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const SUBJECT_LABELS: Record<string, string> = {
  general:  'General Enquiry',
  staffing: 'Staffing',
  join:     'Join the Team',
  other:    'Other',
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 })
  }

  const resend = new Resend(apiKey)

  let body: {
    name:    string
    email:   string
    subject: string
    message: string
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, subject, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const subjectLabel = SUBJECT_LABELS[subject] ?? 'General Enquiry'

  try {
    await resend.emails.send({
      from:    'The Affectionate Care Support Ltd. <onboarding@resend.dev>',
      to:      ['kumdanjob09@gmail.com'],
      replyTo: email,
      subject: `New enquiry: ${subjectLabel} — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <div style="border-top:3px solid #7fac8f;padding:32px 0 8px">
            <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#6b7280;margin:0 0 24px">
              The Affectionate Care Support Ltd. — New Enquiry
            </p>
            <h1 style="font-size:22px;font-weight:300;margin:0 0 4px">${name}</h1>
            <p style="font-size:13px;color:#7fac8f;margin:0 0 32px">${email}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:32px">
            <tr style="border-bottom:1px solid #e5e7eb">
              <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#6b7280;width:40%">Subject</td>
              <td style="padding:10px 0;font-size:13px">${subjectLabel}</td>
            </tr>
          </table>

          <div style="background:#f9fafb;padding:20px;margin-bottom:32px;border-radius:8px">
            <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#6b7280;margin:0 0 10px">Message</p>
            <p style="font-size:13px;line-height:1.65;margin:0">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <p style="font-size:11px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:20px;margin:0">
            Submitted via tacs.health &mdash; reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
  }
}
