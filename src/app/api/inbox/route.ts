import { NextResponse } from 'next/server';
import {
  readInboxMessages,
  updateInboxMessageStatus,
  deleteInboxMessage,
  getInboxStats,
  InboxMessage,
} from '@/lib/inboxStore';

const VALID_ACCESS_KEYS = [
  'sridharshini13102007',
  '907',
  'sridharshini',
  'cit_cyber',
  process.env.INBOX_ACCESS_KEY,
].filter(Boolean) as string[];

function isAuthorized(request: Request): boolean {
  const url = new URL(request.url);
  const keyFromQuery = url.searchParams.get('key');
  const keyFromHeader = request.headers.get('x-inbox-key');
  const authHeader = request.headers.get('authorization');

  const key = keyFromQuery || keyFromHeader || (authHeader?.replace('Bearer ', ''));

  if (!key) {
    // If no key is configured in env, allow access with default operator key
    return false;
  }

  return VALID_ACCESS_KEYS.includes(key.trim().toLowerCase());
}

// GET: Fetch all dispatches recorded in the portfolio backend inbox
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get('key') || request.headers.get('x-inbox-key');

    // Operator Authentication Gate
    if (!isAuthorized(request)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized. Operator clearance required (PIN: 907 or sridharshini).',
          authenticated: false,
        },
        { status: 401 }
      );
    }

    const messages = readInboxMessages();
    const stats = getInboxStats();

    return NextResponse.json({
      success: true,
      authenticated: true,
      messages,
      total: stats.total,
      unreadCount: stats.unreadCount,
    });
  } catch (error) {
    console.error('[API/Inbox] GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while fetching inbox.' },
      { status: 500 }
    );
  }
}

// PATCH: Update message status (e.g. mark as read, starred, archived)
export async function PATCH(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized operator clearance.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status } = body as { id: string; status: InboxMessage['status'] };

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Message ID and new status are required.' },
        { status: 400 }
      );
    }

    const updated = updateInboxMessageStatus(id, status);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Message not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: updated,
      unreadCount: getInboxStats().unreadCount,
    });
  } catch (error) {
    console.error('[API/Inbox] PATCH error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error updating message status.' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a message by ID
export async function DELETE(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized operator clearance.' },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID is required for deletion.' },
        { status: 400 }
      );
    }

    const deleted = deleteInboxMessage(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Message not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Dispatch message deleted from portfolio inbox.',
      stats: getInboxStats(),
    });
  } catch (error) {
    console.error('[API/Inbox] DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error deleting message.' },
      { status: 500 }
    );
  }
}

