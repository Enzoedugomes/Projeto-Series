import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Serie

def validar(dados):
    try:
        dados["titulo"]
        dados["plataforma"]
        ano = int(dados["ano"])
        avaliacao = float(dados["avaliacao"])
    except (KeyError, ValueError, TypeError):
        return "Dados incompletos: confira titulo, plataforma, ano e avaliacao"

    if avaliacao < 0 or avaliacao > 10:
        return f"nota {avaliacao} inválida: use um número de 0 a 10"

    if ano < 1900 or ano > 2026:
        return "Ano deve estar entre 1900 e 2026"
    
    return None

@csrf_exempt
def api_series(request):
    if request.method == "POST":
        dados = json.loads(request.body)

        erro = validar(dados)
        if erro:
            return JsonResponse({"erro": erro}, status=400)

        serie = Serie.objects.create(
            titulo=dados["titulo"],
            plataforma=dados["plataforma"],
            ano=int(dados["ano"]),
            avaliacao=float(dados["avaliacao"]),
        )
        return JsonResponse({"id": serie.id}, status=201)

    series = list(Serie.objects.values())
    return JsonResponse(series, safe=False)


def resumo_series(request):
    series = list(Serie.objects.values())
    total = len(series)

    if total == 0:
        return JsonResponse({
            "total": 0,
            "media_avaliacao": 0,
            "melhor": None,
        })
    
    soma = 0
    maior = series[0]["avaliacao"]
    melhor = series[0]["titulo"]

    for s in series:
        soma = soma + s["avaliacao"]
        if s["avaliacao"] > maior:
            maior = s["avaliacao"]
            melhor = s["titulo"]
    
    media = round(soma / total, 2)
    return JsonResponse({
        "total": total,
        "media_avaliacao": media,
        "melhor": melhor,
    })

    