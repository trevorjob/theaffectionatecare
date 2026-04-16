import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  const password = process.env.TIMESHEET_PASSWORD
  if (!password) {
    return NextResponse.json({ error: 'Not configured.' }, { status: 500 })
  }

  let body: { password: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (body.password !== password) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  }

  const filePath = path.join(process.cwd(), 'public', 'downloads', 'timesheet.pdf')
  let fileBuffer: Buffer
  try {
    fileBuffer = await readFile(filePath)
  } catch {
    return NextResponse.json({ error: 'File not available.' }, { status: 404 })
  }

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="TACS-Staff-Timesheet.pdf"',
    },
  })
}
