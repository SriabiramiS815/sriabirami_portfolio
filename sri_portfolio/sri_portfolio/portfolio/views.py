import logging

from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.views.decorators.http import require_POST

from . import data
from .forms import ContactForm

logger = logging.getLogger(__name__)


def _page_context(form):
    return {
        "profile": data.PROFILE,
        "stats": data.STATS,
        "skill_groups": data.SKILL_GROUPS,
        "projects": data.PROJECTS,
        "experience": data.EXPERIENCE,
        "education": data.EDUCATION,
        "certifications": data.CERTIFICATIONS,
        "form": form,
    }


def home(request):
    return render(request, "portfolio/index.html", _page_context(ContactForm()))


@require_POST
def contact(request):
    """Handle the contact form (works with JavaScript fetch and as a normal form post)."""
    is_ajax = request.headers.get("x-requested-with") == "XMLHttpRequest"
    form = ContactForm(request.POST)

    if not form.is_valid():
        if is_ajax:
            errors = {field: [str(e) for e in errs] for field, errs in form.errors.items()}
            return JsonResponse({"ok": False, "errors": errors}, status=400)
        return render(request, "portfolio/index.html", _page_context(form), status=400)

    # Honeypot filled in -> almost certainly a bot. Pretend it worked, save nothing.
    if form.cleaned_data.get("website"):
        return _success(request, is_ajax)

    contact_message = form.save()

    try:
        send_mail(
            subject=f"Portfolio message from {contact_message.name}",
            message=(
                f"Name: {contact_message.name}\n"
                f"Email: {contact_message.email}\n"
                f"Subject: {contact_message.subject or '-'}\n\n"
                f"{contact_message.message}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.PORTFOLIO_OWNER_EMAIL],
            fail_silently=False,
        )
    except Exception:  # the message is already saved; never fail the visitor over e-mail
        logger.exception("Could not send contact notification e-mail")

    return _success(request, is_ajax)


def _success(request, is_ajax):
    text = "Thank you! Your message has been sent. I'll get back to you soon."
    if is_ajax:
        return JsonResponse({"ok": True, "message": text})
    messages.success(request, text)
    return redirect("/#contact")
